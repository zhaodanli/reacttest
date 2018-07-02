import  React , {Component} from 'react'; //创建元素
import {render} from 'react-dom'; //渲染页面dom

//校验属性的正确性  npm install prop-types 
import PropTypes from 'prop-types';

class Person extends Component{
    //Es6不支持静态属性, 只有静态方法  这个是ES7的 
    static propTypes = {
        name: PropTypes.string.isRequired ,
        age : PropTypes.number,
        gender:  PropTypes.oneOf ([ '男' ,'女']),
        hobby :  PropTypes.arrayOf(PropTypes.string),
        pos:  PropTypes.shape({x: PropTypes.number,y: PropTypes.number}),
        salary(props,propty){
            if(props[propty] > 3000){throw new Error('salary too big')}
            return props[propty] < 3000;   
        }
    }
    //设置默认属性
    static defaultProps = {name:'zdl'}
    constructor(props){super();}
    render(){return (<h1>{this.props.age}</h1>)}
}
let person = {
    name : 100 ,
    age : '20' ,
    gender: '男' ,
    hobby : ['吃饭', '睡觉'],
    pos: {x:100, y:200},
    salary: 5000
}
render(<Person {...person}></Person>, window.root)