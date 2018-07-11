// let crypto = require('crypto'); // 常见的加密模块
// // console.log(crypto.getHashes());
// //1)md5 其实不叫加密 ,叫摘要算法, 特点不可逆,输出结果长度相等,内容不同输出的结果就不同,反之相同

// let md5 = crypto.createHash('md5') // 创建一个算法,经常用这种方式传文件
// md5.update('123456'); // update加密 把哪段文字加密
// let result1 = md5.digest('hex');//base64/hex16进制
// let md52 = crypto.createHash('md5') // 创建一个算法,经常用这种方式传文件
// md52.update('1234567'); // update加密 把哪段文字加密
// let result = md52.digest('base64');//base64/hex16进制
// // 如果存的是密码 多次加密。 拖库

// //缺点  加密文件,会把文件读取到内存中,在文件很大的时候一般分段读,
// let fs = require('fs');
// let str = fs.readFileSync(__dirname+'/index.html','utf8');
// let md53 = crypto.createHash('md5');
// md53.update(str);
// let result2 = md53.digest('hex');
// console.log(result2);

// // ------------ 加盐算法
// //客户端第二次请求文件,服务器会先判断加密是否一致,如果一致会返回304从缓存中读取,
// let md54 = crypto.createHash('md5');
// let rs = fs.createReadStream(__dirname + '/index.html',{highWaterMark:3});
// rs.on('data',function (data) {
//       md54.update(data); // update可以调用多次 data是buffer
// });
// rs.on('end', function (data) {
//     console.log(md54.digest('hex'));
// })


// let crypto = require('crypto');
// let hmac1 = crypto.createHmac('sha1', 'zdl'); //ascii为一个字符串，用于指定一个PEM格式的密钥
// hmac1.update('zdl');
// let result1 = hmac1.digest('hex');
// console.log(result1);



// // PEM是OpenSSL的标准格式，OpenSSL使用PEM文件格式存储证书和密钥，是基于Base64编码的证书。
// let fs = require('fs');
// let pem  = fs.readFileSync(__dirname+'/rsa_private.key');
// let key = pem.toString('ascii');
// let hmac = crypto.createHmac('sha1', key);
// hmac.update('zdl');
// let result = hmac.digest('hex');
// console.log(result);

// // 对称加密 钥匙相同
// let crypto = require('crypto');
// let fs = require('fs');
// let key = fs.readFileSync(__dirname + '/rsa_private.key')
// let cipher = crypto.createCipher('blowfish', key);
// cipher.update('zdl123r');
// let result = cipher.final('hex');
// console.log(result);


// let deciper = crypto.createDecipher('blowfish', key);
// // 告诉他刚才加密的是hex
// deciper.update(result,'hex');
// let r = deciper.final('utf8');
// console.log(r);

// 非对称加密
let crypto = require('crypto');
let fs = require('fs');
let public = fs.readFileSync(__dirname+'/rsa_public.key','utf8');
let private = fs.readFileSync(__dirname +'/rsa_private.key','utf8');
let result = crypto.publicEncrypt(public, Buffer.from('hello'));
let r = crypto.privateDecrypt(private, result);
console.log(r.toString());