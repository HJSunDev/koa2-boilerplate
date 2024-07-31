const fs = require('fs');
const path = require('path');
const readline = require('readline');

// 创建 readline 接口实例
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// 提示用户输入模块名
rl.question('Enter the module name: ', function (moduleName) {
    // 计算src目录的绝对路径
    const basePath = path.join(__dirname, '..', '..', '..', 'src', moduleName);

    const templatePath = path.join(__dirname, 'template', 'route.js');  // 模板文件路径

    // 检查模块目录是否已存在
    if (fs.existsSync(basePath)) {
        console.log(`Module '${moduleName}' already exists.`);
        rl.close();
        process.exit();  // 终止脚本执行
    }

    // 读取模板文件内容
    const routeTemplateContent = fs.existsSync(templatePath) ? fs.readFileSync(templatePath, 'utf8') : '// Default route content';

    // 定义要创建的目录和文件结构
    const structures = [
        { path: 'controller', file: 'controller.js', content: '// Controller content' },
        { path: 'model', file: 'model.js', content: '// Model content' },
        { path: 'route', file: 'index.router.js', content: routeTemplateContent },
        { path: 'service', file: 'service.js', content: '// Service content' }
    ];

    // 创建模块目录
    fs.mkdirSync(basePath, { recursive: true });

    // 创建子目录和文件
    structures.forEach(structure => {
        const dirPath = path.join(basePath, structure.path);
        if (!fs.existsSync(dirPath)) {
            fs.mkdirSync(dirPath, { recursive: true });
        }
        const filePath = path.join(dirPath, structure.file);
        fs.writeFileSync(filePath, structure.content);
    });

    console.log(`Module '${moduleName}' has been created successfully.❤❤❤❤❤❤❤`);
    rl.close();
});
