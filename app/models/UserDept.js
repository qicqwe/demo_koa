/**
 * @author maqiao
 * @date 2019/3/29 8:52
 */
module.exports =  (sequelize, DataTypes)=>{
    return sequelize.define('sys_user_dept',{
        id:{
            type:DataTypes.INTEGER,
            primaryKey:true,
            autoIncrement:true
        },
        userId:{
            type: DataTypes.STRING
        },
        deptId:{
            type: DataTypes.STRING
        }
    },{freezeTableName:true});
}