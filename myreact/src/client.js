let http = require('http');
let fs = require('fs');
let pause = false; // 默认开启下载模式  true时暂停
let ws = fs.createWriteStream('./download.txt');//希望下载到这个地方去
let options = {
    hostname: 'localhost',  //主机/路径
    port: 3000, //端口号  还有个头0-3/3-5等等
}
// 实现下载功能
let start = 0;
process.stdin.on('data',function (data) {
    data = data.toString();
    if(data.match(/p/)){
        pause = true;
    }else{
        pause = false;
        download();
    }
})

function download() {
    // 请求之前加个请求头
    options.headers = {
        'Range': `bytes=${start}-${start + 9}`
    }
    start += 10;
    // let socket = http.request(options);//每次调用时请求的文件位置累加
    // socket.write();
    // socket.end()//发送请求
    //等同于
    http.get(options, function (res) { //多次发送请求 get 没有请求题
        let buffers = [];
        let total = res.headers['content-range'].split('/')[1];
        total = parseInt(total);//58
        res.on('data',function(data){
            buffers.push(data);
        })
        res.on('end', function () {
            let str = Buffer.concat(buffers).toString();
            ws.write(str);//写到文件去
            if (!pause && start < total) { // 没有完毕才继续请求
              setTimeout(() => {
                download()
              }, 1000);
            }
        });
    })
}
download();