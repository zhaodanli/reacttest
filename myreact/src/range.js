let http = require('http');
let path = require('path');  //路径
let fs = require('fs'); //读文件
let p = path.join(__dirname,'1.txt'); //获取读文件的路径
let {promisify} = require('util');
let stat = promisify(fs.stat); // 将stat方法转化成promise的方法 可能没有end默认全部读取
let server = http.createServer();
server.on('request',async function (req,res) {
    //取请求头，取的到则分段，否则就整体获取
    let range = req.headers['range'];
    try{
        let s = await stat(p);
        let size = s.size;
        if (range) {
            let [, start, end] = range.match(/(\d*)-(\d*)/);//第一个参数是匹配字符串，第二个是第一项，第二个是第二项
            start = start ? Number(start) : 0;
            end = end ? Number(end) : size-1;
            res.statusCode = 206;
            // 告诉客户端当前是范围请求
            res.setHeader('Accept-Ranges','bytes');
            // 返回的内容长度
            res.setHeader('Content-Length',end-start+1);
            res.setHeader('Content-Range', `bytes ${start}-${end}/${size}`); 
            fs.createReadStream(p,{start,end}).pipe(res); //把读取的结果传给res
        } else {
            // 边读边写，返回文件
            fs.createReadStream(p).pipe(res);//res是可写流，在可读流和可写流之间加管道，相当于不停的读文件不同的调res的write方法
        }
    }catch(e){
        console.log(e);
        
    }
})
server.listen(3000); 