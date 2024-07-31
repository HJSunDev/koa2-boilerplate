// 引入并激活 `module-alias`，允许在项目中使用自定义的路径别名:package.json _moduleAliases 属性
require('module-alias/register');

// 获取env配置信息
const {APP_PORT}  = require('./app/config/config.default.js')

// 获取koa实例
const app = require('./app/app.js')

app.listen(APP_PORT, ()=>{
    console.log(`starting at port ${APP_PORT}`);
})
