let http = require('http');
let url = require('url');
let querystring = require('querystring');
let formidable = require('formidable')
let path = require('path')
// let str = "username==123&&password==321";
// // 指定字段之间的分隔符 和 key、value之间的分隔符-》对象
// let obj = querystring.parse(str,'&&','==');
// console.log(obj);

let server = http.createServer(function(req,res){
    let {pathname,query} = url.parse(req.url,true);
    let method = req.method.toLowerCase();//在node中取得的方法名永远是大写的
    if(pathname === '/form'){
        if(method === 'get'){
            res.end(JSON.stringify(query))
        }else{
            var form = new formidable.IncomingForm();
            //fields a=b&c=d文本  files文件
            form.keepExtensions = true;//保留后缀
            form.encoding = 'utf-8';
            form.uploadDir = path.join(__dirname,'./myDir');
            form.parse(req, function(err, fields, files) {
            });
            form.on('end', function() {
                res.end('上传成功');
            });
        }
    }
})
server.listen(3000)