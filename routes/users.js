/**
 * @author maqiao
 * @date 2019/3/27 17:07
 */
const router = require('koa-router')();
const UserConstroller = require("../app/constrollers/UserConstroller");
router.prefix('/user');
router.post('/login', UserConstroller.login);
router.get('/loginOut', UserConstroller.loginOut);
router.post('/create', UserConstroller.create);
router.get('/delete/:id', UserConstroller.delete);
router.post('/:userId/update', UserConstroller.edit);
router.get('/disable/:userId', UserConstroller.disable);
router.get('/unDisable/:userId', UserConstroller.unDisable);
router.get('/info/:userId', UserConstroller.getUserInfo);
router.get("/dept/:deptId/users", UserConstroller.getusersByDeptId);
router.post("/search", UserConstroller.search);
module.exports = router;
