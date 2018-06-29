import  React from 'react'; //创建元素
import {render} from 'react-dom'; //渲染页面dom

let arr = ['不吃饭','不睡觉'];

//使用map时需要增加key
// function toLis(){
//     return arr.map((item,index)=>(<li key = {index}>{item + index}</li>))
// }
let ele =  <div>{toLis(1)}</div>;
console.log(ele)
render(ele, document.getElementById('root'))