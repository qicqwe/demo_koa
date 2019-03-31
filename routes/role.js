/**
 * @author maqiao
 * @date 2019/3/28 17:04
 */
const router = require('koa-router')();
const RoleConstroller =require("../app/constrollers/RoleConstroller");
router.prefix('/role');
router.post('/create',async (ctx,next)=>{});
router.get('/delete/:id',async (ctx,next)=>{});
router.post('/:id/edit',async (ctx,next)=>{});
router.post('/search',async (ctx,next)=>{});
router.get('/user/:id/roles',async (ctx,next)=>{});
module.exports = router;


