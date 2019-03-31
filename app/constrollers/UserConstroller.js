/**
 * @author maqiao
 * @date 2019/3/28 9:44
 */
const jwt = require('jsonwebtoken');
const Stringutil = require("../../utils/stringutil");
const RedisCoustom = require("../../redis/RedisCoustom");
const {User, UserDept,UserRole,Role} = require("../init/dbInitConfig");
const Op = require('sequelize').Op;
class UserConstroller {
    static async login(ctx, next) {
        try {
            let userName=ctx.request.body.username;
            let passWord=ctx.request.body.password;
            if(!userName||!passWord){
                if(ctx.payload){
                    ctx.body = {sessionId: ctx.sessionId,userInfo:ctx.payload.user,roles:ctx.payload.role};
                }else{
                    ctx.body = {
                        status: 50014,
                        message: '请登录。'
                    };
                }
            }else{
                let user = await User.findOne({
                    where: {
                        userCount:userName,
                        passWord: passWord
                    }
                });
                //获取权限
                let roles=await Role.findAll({
                    attributes:['roleCount','roleDepict'],
                    include: [{
                        model: UserRole,
                        as: "userrole",
                        attributes: [],
                        where: {
                            userId: user._previousDataValues.id
                        }
                    }],
                    raw: false
                });
                let payload = {user: user._previousDataValues,role:roles};
                let token = jwt.sign(payload, "maqiao");
                let sessionId = Stringutil.randomString(16);
                //返回sessionId  同时把sessionId与token的对应关系存到redis中
                await  RedisCoustom.set(sessionId, token);
                ctx.body = {sessionId: sessionId,userInfo:payload.user,roles:payload.role};
            }
        }catch (err){
            console.log(err);
        }
    }

    static async loginOut(ctx, next) {
        let authorization = ctx.request.headers["authorization"];
        //redis中删除缓存的session-token
        await RedisCoustom.del(authorization);
    }

    static async create(ctx, next) {
        User.create({
            id: Stringutil.randomString(16),
            userName: ctx.request.body.userName,
            passWord: ctx.request.body.passWord,
            userStatus: '0'
        });
    }

    static async delete(ctx, next) {
        ctx.body = await User.destroy({
            where: {
                id: ctx.params.userId
            }
        });
    }

    static async disable(ctx, next) {
        ctx.body = await User.update({
            userStatus: "1",
        }, {
            where: {
                id: ctx.params.userId
            }
        });
    }

    static async unDisable(ctx, next) {
        ctx.body = await User.update({
            userStatus: "0",
        }, {
            where: {
                id: ctx.params.userId
            }
        });
    }

    static async edit(ctx, next) {

    }

    static async getUserInfo(ctx, next) {
        try {
            let user = await  User.findByPk(ctx.params.userId);
            ctx.body = user._previousDataValues;
        } catch (err) {
            console.log(err);
        }
    }

    static async getusersByDeptId(ctx, next) {
        try {
            ctx.body = await  User.findAll({
                include: [{
                    model: UserDept,
                    as: "userdept",
                    attributes: [],
                    where: {
                        deptId: ctx.params.deptId
                    }
                }],
                raw: false
            });
        } catch (err) {
            console.log(err);
        }
    }

    static async search(ctx, next) {
        try {
            ctx.body = await User.findAll({
                where: {
                    userCount: {
                        [Op.like]: `%${ctx.request.body.userCount}%`
                    },
                    userName: {
                        [Op.like]: `%${ctx.request.body.userName}%`
                    }
                }
            });
        } catch (err) {
            console.log(err);
        }
    }
}

module.exports = UserConstroller;