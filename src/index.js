const fs = require('fs')

const path = require('path');

const Router = require('koa-router')

const router = new Router()


// 获取指定路径下的所有子目录
const getDirectories = srcPath => {
    return fs.readdirSync(srcPath).filter(file => {
        return fs.statSync(path.join(srcPath, file)).isDirectory();
    });
};

// 从指定的路由目录中导入并注册路由
const registerRoutesFromDirectory = (routeDirPath) => {
    if (fs.existsSync(routeDirPath)) {
        const routeFiles = fs.readdirSync(routeDirPath).filter(file => {
            return path.extname(file) === '.js';
        });

        routeFiles.forEach(file => {
            const filePath = path.join(routeDirPath, file);
            const moduleRouter = require(filePath);
            router.use(moduleRouter.routes());
        });
    }
};

// 获取src目录下的所有子模块目录
const moduleDirs = getDirectories(__dirname);

// 遍历每个子模块目录，处理其中的route路由文件夹
moduleDirs.forEach(dir => {
    const routeDirPath = path.join(__dirname, dir, 'route');
    registerRoutesFromDirectory(routeDirPath);
});


module.exports = router;