# ============================================
# 第一阶段: 构建前端项目
# ============================================
FROM node:22-alpine AS build

# 设置工作目录
WORKDIR /app

# 复制 package.json 和 package-lock.json
# 单独复制依赖文件可以利用 Docker 缓存层,提高构建速度
COPY package*.json ./

# 更新npm
RUN npm i --force

# 安装依赖
RUN npm install

# 复制所有项目文件
COPY . .

# 构建生产版本
RUN npm run build

# ============================================
# 第二阶段: 使用 Nginx 部署
# ============================================
FROM nginx:alpine

# 从构建阶段复制打包后的文件到 Nginx 静态目录
COPY --from=build /app/dist /usr/share/nginx/html

# 复制自定义 Nginx 配置
COPY nginx.conf /etc/nginx/conf.d/default.conf

# 声明容器监听 80 端口
EXPOSE 3000

# 启动 Nginx(前台运行)
CMD ["nginx", "-g", "daemon off;"]