//多进程,其中一个服务挂掉不会死掉,创建很多进程,共享服务,不想每次吧server用http的方式传过去
//集群  父进程里面可以开 子进程,子进程不能再开子进程
// 父进程和子进程可以共享一段代码
// 进程里的fork 叉子,将一个进程叉成两份

let http = require('http');
let path = require('path');
let cluster = require('cluster');
let len = require('os').cpus().length;


//将主进程子进程代码分开写
cluster.setupMaster({
    exec: path.join(__dirname,'sub.js')//子进程地址
});
for (var i = 0; i < len; i++) {
    cluster.fork();
}
// cluster可以判断是否是主进程 ，我们只在主进程中实现fork子进程
//cluster.fork();//创建子进程,会走两次,主进程跑一次,子跑一次
// let len = require('os').cpus().length;
// if(cluster.isMaster) {
//     for (var i = 0; i < len; i++) {
//         cluster.fork();
//     }
// }else{//子进程提供服务
//     //多个子进程可以监听多个服务
//     console.log(process.pid);
//     http.createServer(function(req,res){
//         res.end('ok' + process.pid)
//     }).listen(3000)
// }
