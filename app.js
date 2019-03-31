const Koa = require('koa');
const app = new Koa();
const json = require('koa-json');
const onerror = require('koa-onerror');
const logUtil = require('./utils/log_util');
const indexRouter = require("./routes/index");
const url_filter=require("./middleware/response_formatter");
const checkTonken=require("./middleware/checkTonken");
const koaBody = require('koa-body');
const path = require('path');
const uploadFileUtil = require("./utils/uploadFileUtil");
// error handler
onerror(app);
// middlewares
app.use(koaBody({
    multipart:true, // 支持文件上传
    encoding:'utf-8',
    formidable:{
        uploadDir:path.join(__dirname,'public/upload/'), // 设置文件上传目录
        keepExtensions: true,    // 保持文件的后缀
        maxFieldsSize:200 * 1024 * 1024, // 文件上传大小
        onFileBegin: (name, file) => {
            // 获取文件后缀
            const ext = uploadFileUtil.getUploadFileExt(file.name);
            // 最终要保存到的文件夹目录
            const dirName = uploadFileUtil.getUploadDirName();
            const dir = path.join(__dirname, `public/upload/${dirName}`);
            // 检查文件夹是否存在如果不存在则新建文件夹
            uploadFileUtil.checkDirExist(dir);
            // 获取文件名称
            const fileName = uploadFileUtil.getUploadFileName(ext);
            // 重新覆盖 file.path 属性
            file.path = `${dir}/${fileName}`;
            app.context.uploadpath = app.context.uploadpath ? app.context.uploadpath : {};
            app.context.uploadpath['path'] = `${dirName}/${fileName}`;
            app.context.uploadpath['name'] = file.name;
        },
    }
}));
app.use(json());
app.use(require('koa-static')(__dirname + '/public'));
// logger
app.use(async (ctx, next) => {
    //响应开始时间
    const start = new Date();
    //响应间隔时间
    var ms;
    try {
        //开始进入到下一个中间件
        await next();
        ms = new Date() - start;
        //记录响应日志
        logUtil.logResponse(ctx, ms);
    } catch (error) {
        ms = new Date() - start;
        //记录异常日志
        logUtil.logError(ctx, error, ms);
    }
});
app.use(checkTonken);
app.use(url_filter('^/file'));
// routes
app.use(indexRouter());
// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});

module.exports = app;
