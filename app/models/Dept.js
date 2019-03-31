/**
 * @author maqiao
 * @date 2019/3/28 17:17
 */
module.exports= (sequelize, DataTypes)=>{
    return sequelize.define('sys_dept',{
        id:{
            type:DataTypes.STRING,
            primaryKey:true,
            allowNull:false
        },
        deptCount:{
            type:DataTypes.STRING,
            allowNull:false
        },
        deptName:{
            type:DataTypes.STRING,
            allowNull:false
        },
        deptFullName:{
            type:DataTypes.STRING,
            allowNull:false
        },
        parentId:{
            type:DataTypes.STRING,
            allowNull:false
        },
        parentName:{
            type:DataTypes.STRING,
            allowNull:false
        },
        deptStatus:{
            type:DataTypes.INTEGER,
            allowNull:false,
            defaultValue:0
        },
        sort:{
            type:DataTypes.INTEGER,
            allowNull:false,
            defaultValue:0
        }
    },{freezeTableName:true});
}