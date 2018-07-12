// 实现一个静态服务
let http = require('http');
let fs = require('fs');
let url = require('url');
let zlib = require('zlib');
let util = require('util');
let path = require('path');

let mime = require('mime');
let ejs = require('ejs'); // 渲染模板
let chalk = require('chalk'); // 粉笔
let debug = require('debug')('*');//所有的都输出
// 第二个参数可以指定环境变量在为什么值时才打印
// window set DEBUG=XXX  export DEBUG=XXXX


let config = require('./config');
let readdir = util.promisify(fs.readdir);
let stat = util.promisify(fs.stat);
let template = fs.readFileSync(path.resolve(__dirname, 'tmpl.html'), 'utf8');  //代码已启动就读
class Server {
    constructor(args) {
        this.config = {...config,...args}, // 将配置挂载在我们的实例上,方便后期手动指定,直接get就可以
        this.template = template;
    }
    async handleRequest(req, res) { // 这里的this都是实例
        let { pathname } = url.parse(req.url, true);
        let p = path.join(this.config.dir, pathname);
        try { // 如果没错误说明文件存在
            let statObj = await stat(p);
            if (statObj.isDirectory()) {
                // 现在需要一个当前目录下的解析出的对象或者数组
                let dirs = await readdir(p);
                dirs = dirs.map(dir => { // dirs就是要渲染的数据
                    return {
                        filename: dir, 
                        pathname: path.join(pathname, dir)
                    }
                });
                let str = ejs.render(this.template, { dirs, title: 'ejs' });
                res.setHeader('Content-Type', 'text/html;charset=utf8');
                res.end(str);
            } else {
                // 文件 发送文件,判断是否支持缓存,压缩等
                this.sendFile(req, res, p, statObj);//请求/响应/路径/状态
            }
        } catch (e) {// 文件不存在的情况
            this.sendError(req, res, e);
        }
    }
    start() {
        let server = http.createServer(this.handleRequest.bind(this));//this.handleRequest,this是回调函数的this,也可以在该函数return 箭头函数
        let { hostname, port } = this.config;
        debug(`http://${hostname}:${chalk.green(port)} start`)
        server.listen(port, hostname);
    }
    cache(req, res, p, stat) {
    }
    gzip(req, res, p, stat) {
    }
    range(req, res, p, stat) {
    }
    sendFile(req, res, p, stat) {
        res.setHeader('Content-Type', mime.getType(p) + ';charset=utf8');
        fs.createReadStream(p, { start, end }).pipe(res);
    }
    //错误处理
    sendError(req, res, e) {
        // 解析字符串打印对象
        debug(util.inspect(e).toString());//inspect解析
        res.statusCode = 404;
        res.end(`Not Found`);
    }
}

// let server = new Server();
// server.start();
module.export = Server; 