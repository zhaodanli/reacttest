let zlib = require('zlib'); // 核心
let path = require('path');
let fs = require('fs');

// 压缩流 将1.txt压缩成1.txt.gz
function gzip(source){ //source文件目录
    let gzip = zlib.createGzip(); // 转化流 可读可写
    fs.createReadStream(source).pipe(gzip).pipe(fs.createWriteStream(source+'.gz')); //读=>压缩=>写新的
}
//gzip(path.join(__dirname, '1.txt'));
//解压
function ungzip(source) {
    let ungz = zlib.createGunzip();
    fs.createReadStream(source).pipe(ungz).pipe(fs.createWriteStream(path.join(__dirname,path.basename(source,'.gz'))));
}
ungzip(path.join(__dirname, '1.txt.gz'))