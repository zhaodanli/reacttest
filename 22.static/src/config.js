let path = require('path')
let config = {
    hostname : 'localhost', //主机
    port:3000, //端口号
    dir:path.join(__dirname, '..','public')
}
module.exports = config;