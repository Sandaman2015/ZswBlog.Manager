# STEP 1: Build
FROM node:10

LABEL authors="sandaman2015 <office@sandaman2015.com>"

# COPY package.json package-lock.json ./

# RUN npm set progress=false && npm config set depth 0 && npm cache clean --force

# RUN npm i && mkdir /app

#cp -R ./node_modules ./app
COPY ./ /app

WORKDIR /app

# COPY . .

RUN npm install --registry=https://registry.npm.taobao.org && npm update --registry=https://registry.npm.taobao.org && npm run build:prod

# STEP 2: Setup
FROM nginx:1.17

# 在k8s环境下，将conf文件以configmap形式进行映射，测试docker环境下需要放开
#COPY --from=0 /app/_nginx/nginx.conf /etc/nginx/nginx.conf

#COPY --from=0 /app/_nginx/* /etc/nginx/

# 更改文件存放目录/etc/nginx/html，去除原本的/usr/share/nginx/html/目录中
# RUN rm -rf /usr/share/nginx/html/*
# COPY --from=0 /dist /usr/share/nginx/html

COPY --from=0 /app/dist /etc/nginx/html

CMD [ "nginx", "-g", "daemon off;"]
