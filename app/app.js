const Koa = require('koa');
const path = require('path');
const router = require('@/index.js');
const serve = require('koa-static')
const { koaBody } = require('koa-body');
const cors = require('koa2-cors');

const app = new Koa();

/**
 * 在 Koa 应用中，中间件的执行顺序是按照它们被添加到应用中的顺序进行的，
 * 并遵循“洋葱模型”（即中间件层层嵌套，请求从外层进入到核心，响应则从核心返回外层）
 */


//跨域资源共享模块 - 建议将 CORS 中间件放在其他业务逻辑中间件之前
app.use(cors());

/**
 * 使用 koa-body 中间件
 * `koa-body` 用于解析 HTTP 请求体,它支持多种类型的请求体: 包括 JSON、表单数据和文件上传
 * 这个中间件可以自动处理和解析：
 * 1. application/json - 解析 JSON 格式的请求体数据。
 * 2. application/x-www-form-urlencoded - 解析从表单提交的 URL 编码数据。
 * 3. multipart/form-data - 解析多部分表单数据，通常用于文件上传。
 * 将解析后的数据存放在 ctx.request.body 中，文件信息存放在ctx.request.files 中
 * koa-body 还提供了配置项来定制如文件上传路径、大小限制、保留文件扩展名等功能
 */
app.use(koaBody({
    // 支持文件上传
    multipart: true,  
    formidable: {
        // 设置文件上传目录
        uploadDir: './uploads', 
        // 保留文件扩展名
        keepExtensions: true,  
    },
    // 指定需要解析的HTTP方法
    parsedMethods: ['POST', 'PUT', 'PATCH', 'DELETE']  
}));

// 静态文件服务模块
app.use(serve(path.join(__dirname, '../../public')))

// 自定义中间件，处理 404 等
app.use(async (ctx, next) => {
    // 进行请求处理前的日志记录或其他操作
    // 等待下游中间件执行
    await next();

    // 在所有中间件执行完毕后检查响应状态
    if (ctx.response.status === 404 && !ctx.body) {
        // 显式设置状态码为404
        ctx.status = 404;
        // 设置响应体内容
        ctx.body = `404 Not Found - The requested resource does not exist.快检查请求路径吧!`;
    }
})

// 路由模块
app.use(router.routes())
app.use(router.allowedMethods());



module.exports = app;