/**
 * @author maqiao
 * @date 2019/3/29 11:39
 */
const router = require('koa-router')();
const FileConstroller =require("../app/constrollers/FileConstroller");
const send =require("koa-send");
router.prefix('/file');
router.post("/upload",FileConstroller.upload);
router.get("/download/:name",async (ctx,next)=>{
    // 为了方便演示，这里直接下载index页面
    var fileName = '15538338302622383.html';
    // Set Content-Disposition to "attachment" to signal the client to prompt for download.
    // Optionally specify the filename of the download.
    // 设置实体头（表示消息体的附加信息的头字段）,提示浏览器以文件下载的方式打开
    // 也可以直接设置 ctx.set("Content-disposition", "attachment; filename=" + fileName);
    ctx.attachment(fileName);
    try {
        await send(ctx, fileName, { root: process.cwd()+'/public/upload/20190329/' });
    }catch (err){
        console.log(err);
    }

});
module.exports = router;