import  React , {Component} from 'react'; //创建元素
import {render} from 'react-dom'; //渲染页面dom
import PropTypes from 'prop-types'; 

// 第1行：React.PropTypes自React 15.5.0开始不推荐使用
//而是使用npm模块prop-types代替react/no-deprecated'PropTypes'已定义，但从未使用过no-unused-vars

class Person extends Component{
    //Es6不支持静态属性, 只有静态方法
    static PropTypes = {
        name: PropTypes.string.isRequired ,
        age : PropTypes.number,
        gender:  PropTypes.oneOf ([ '男' ,'女']),
        hobby :  PropTypes.arrayOf([PropTypes.string]),
        pos:  PropTypes.shape({
            x: PropTypes.number,
            y: PropTypes.number
        }),
        salary(props,propty){
            console.log(props[propty]);
            if(props[propty] > 3000){
                throw new Error('salary too big')
            }
            return props[propty] < 3000;
       
        }
    }
    // static defaultProps = {
    //     name:'zdl'
    // }
    constructor(props){
        super();
        // this.state = {data: ''}
    }

    render(){
        return (<h1>
            {this.props.age}
        </h1>)
    }
   
}
let person = {
   // name : 'person' ,
    age : 20 ,
    gender: '' ,
    hobby : ['吃饭', '睡觉'],
    pos: {
        x:100,
        y:200
    }

}

render(<Person {...person}></Person>, window.root)