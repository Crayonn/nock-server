module.exports = {
    root: process.cwd(),
    watch: false, // 是否热更新数据
    baseUrl: '', // 请求接口前缀，如果设置为'/api'则每个接口都会增加这个前缀
    rootDir: 'mock', // root目录 用于
    extensions: /.js$/, // mock服务注入的文件类型
    host: '127.0.0.1', // 启动服务host
    port: 4000 // 端口
};
