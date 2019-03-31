/**
 * @author maqiao
 * @date 2019/3/28 17:16
 */
module.exports =  (sequelize, DataTypes)=>{
    return sequelize.define('sys_user',{
        id:{
            type:DataTypes.STRING,
            allowNull:false,
            primaryKey:true
        },
        userCount:{
            type:DataTypes.STRING,
            allowNull:false
        },
        userName:{
            type:DataTypes.STRING,
            allowNull:false
        },
        passWord:{
            type:DataTypes.STRING,
            allowNull:false
        },
        userStatus:{
            type:DataTypes.STRING,
            allowNull:false
        }
    },{freezeTableName:true});
};