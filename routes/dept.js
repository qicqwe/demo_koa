/**
 * @author maqiao
 * @date 2019/3/28 17:04
 */
const router = require('koa-router')();
const DeptConstroller = require("../app/constrollers/DeptConstroller");
router.prefix('/dept');
router.post('/create', async (ctx,next)=>{});
router.get('/delete/:id', async (ctx,next)=>{});
router.post('/:id/edit', async (ctx,next)=>{});
router.post('/search', async (ctx,next)=>{});
router.get('/user/:id/depts', async (ctx,next)=>{});
router.get('/info',async (ctx,next)=>{});
module.exports = router;