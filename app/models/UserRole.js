/**
 * @author maqiao
 * @date 2019/3/30 12:48
 */
module.exports =  (sequelize, DataTypes)=>{
    return sequelize.define('sys_user_role',{
        id:{
            type:DataTypes.INTEGER,
            primaryKey:true,
            autoIncrement:true
        },
        userId:{
            type: DataTypes.STRING
        },
        roleId:{
            type: DataTypes.STRING
        }
    },{freezeTableName:true});
}