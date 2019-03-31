/**
 * @author maqiao
 * @date 2019/3/28 8:53
 */

var response_formatter =  (ctx, next) => {
    if (ctx.body) {
        ctx.body = {
            code: 0,
            message: 'success',
            data: ctx.body
        }
    } else {
        ctx.body = {
            code: 0,
            message: 'success'
        }
    }
};
var url_filter = function(pattern){
    return async function(ctx, next){
        var reg = new RegExp(pattern);
        //先去执行路由
        await next();
        //通过正则的url进行格式化处理
        if(!reg.test(ctx.originalUrl)){
            response_formatter(ctx);
        }
    }
};

module.exports = url_filter;
