let http = require('http');
let url = require('url');
let path = require('path');
let fs = require('fs');
let zlib = require('zlib');
let mime = require('mime'); // mime可以根据路径判断当前文件是什么类型 npm install mime
let server = http.createServer(function (req,res) {
    let {pathname} = url.parse(req.url,true);
    if(pathname === '/' || pathname === '\\') pathname = '\index.html';
    let p = path.join(__dirname,pathname);
    fs.stat(p,function (err,stat) {
        // 强制缓存 协商缓存 = 三种都用,强制缓存期间不会请求服务器了
        if(!err){
            //对比缓存,看是否修改过,最后的修改时间
            if (req.headers['if-modified-since'] === stat.ctime.toUTCString()){
                res.statusCode = 304;
                res.end();
            }else{
                // 第一次设置Last-Modified 下一次请求时 会提供一个头 if-modified-since
                res.setHeader('Last-Modified', stat.ctime.toUTCString());//stat.ctime.toUTCString()当前时间
                res.setHeader('Cache-Control','no-cache');
                fs.createReadStream(p).pipe(res);
            }
        }else{
          res.end();
        }
        //对比缓存,看是否修改过,最后的修改时间
    })
})
server.listen(3000);






