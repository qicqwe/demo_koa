/**
 * @author maqiao
 * @date 2019/3/28 17:17
 */
module.exports =  (sequelize, DataTypes)=>{
    return sequelize.define('sys_role',{
        id:{
            type:DataTypes.STRING,
            allowNull:false,
            primaryKey:true
        },
        roleCount:{
            type:DataTypes.STRING,
            allowNull:false
        },
        roleDepict:{
            type:DataTypes.STRING,
            allowNull:false
        }
    },{freezeTableName:true});
};