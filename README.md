## 介绍
nock-server 是一个用于mock的自动化服务工具，用于前端快速mock接口。

### 使用方式
```js
npm install -g nock-server// 全局安装
npm install --save-dev nock-server //三方包安装
```

ps： config 为参数配置(mock文件路径、mock文件类型、ip、端口), 可以在根目录下边使用mock.config.js,配置文件等同config文件;

```js
module.exports = {
    root: process.cwd(),
    watch: false, // 是否热更新数据
    baseUrl: '', // 请求接口前缀，如果设置为'/api'则每个接口都会增加这个前缀
    rootDir: 'mock', // root目录 用于
    extensions: /.js$/, // mock服务注入的文件类型
    host: '127.0.0.1', // 启动服务host
    port: 4000 // 端口
};
```

### 启动
```js
nock-server  // 默认寻找mock文件夹所有js文件
```
