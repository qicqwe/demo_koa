/**
 * @author maqiao
 * @date 2019/3/29 15:25
 */
const db = require("../../config/db_config");
const Dept = db.import('../models/Dept');
const User = db.import('../models/User');
const Role = db.import('../models/Role');
const UserDept = db.import('../models/UserDept');
const UserRole = db.import('../models/UserRole');
var initDd=()=>{
    Dept.sync();
    User.sync();
    Role.sync();
    UserDept.sync();
    UserRole.sync();
    User.belongsTo(UserDept,{foreignKey: 'id', targetKey: 'userId',as:"userdept"});
    Dept.belongsTo(UserDept,{foreignKey: 'id', targetKey: 'deptId',as:"userdept"});
    Role.belongsTo(UserRole,{foreignKey: 'id', targetKey: 'roleId',as:"userrole"});

}
module.exports={
    initDd,Dept,User,UserDept,Role,UserRole
};