/**
 * @author maqiao
 * @date 2019/3/28 11:45
 */
const Promise = require("bluebird");
const jwt = require("jsonwebtoken");
const verify = Promise.promisify(jwt.verify);
const RedisCoustom = require("../redis/RedisCoustom");
module.exports = async (ctx, next) => {
    let url = ctx.request.url;
    let authorization = ctx.request.headers["authorization"];
    if (url == "/user/login") {
        if(authorization){
           let token = await RedisCoustom.get(authorization);
           if(token){
               let payload = await verify(token, "maqiao");
               ctx.payload = payload;
               ctx.sessionId = authorization;
           }
        }
        await next();
    } else if (url == "/user/loginOut") {
        await next();
    } else {
        if (!authorization) {
            ctx.body = {
                status: 50014,
                message: '请登录。'
            };
        } else {
            let token = await RedisCoustom.get(authorization);
            if (token == null) {
                ctx.body = {
                    status: 50014,
                    message: '请登录。'
                };
            } else {
                let payload = await verify(token, "maqiao");
                ctx.payload = payload;
                ctx.sessionId = authorization;
                await next();
            }
        }
    }
};