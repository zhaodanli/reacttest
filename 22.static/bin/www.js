#! /usr/bin/env node 

let yargs = require('yargs')
let argv = yargs.option('port', {
  alias: 'p',
  default: 3000,
  demand: false,
  description: 'this is port'
}).option('hostname', {
  alias: 'host',
  default: 'localhost',
  type: String,
  demand: false,
  description: 'this is hostname'
}).option('dir', {
  alias: 'd',
  default: process.cwd(), //以当前工作目录环境执行
  type: String,
  demand: false,
  description: 'this is cwd'
}).usage('zdl [options]').argv;
let Server = require('../src/app');
console.log(Server);

new Server(argv).start(); // 开启服务  argv覆盖掉config

// let platform = require('os').platform();
// let {exec} = require('child_process');
// if(platform === 'win32'){
//   exec(`start http://${argv.hostname}:${argv.port}`);
// }else{
//   exec(`open http://${argv.hostname}:${argv.port}`);
// }  