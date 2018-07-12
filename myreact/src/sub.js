//集群目的是启多个进程开启同一个服务,保证服务运行安全,还有类似于集成通信,错误监听等等,和分布式没关系
let http = require('http');
console.log(process.pid);
http.createServer(function(req,res){
    res.end('ok' + process.pid)
}).listen(3000)