/**
 * @author maqiao
 * @date 2019/3/29 11:39
 */
class FileConstroller{
    static async upload(ctx, next){
        return ctx.body = `上传成功 文件${ctx.app.context.uploadpath.name}保存为${ctx.app.context.uploadpath.path}`;
    }
    static async download(ctx, next){
        return ctx.body ="123";

    }
}
module.exports = FileConstroller;