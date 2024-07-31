# 使用官方 Node.js 镜像
FROM node:16

# 设置工作目录
WORKDIR /app

# 复制 package.json 和 package-lock.json
COPY package*.json ./

# 安装依赖
RUN npm install --production

# 复制项目所有文件到工作目录
COPY . .

# 暴露端口
EXPOSE 8000

# 运行你的应用
CMD ["node", "main.js"]
