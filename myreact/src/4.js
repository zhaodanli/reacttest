import  React , {Component} from 'react';
import ReactDom, {render} from 'react-dom'; 


class Person extends Component{
    constructor(props){
        super();
        this.state = {num: 0}
        //this.fn = this.fn.bind(this)
    }
    // fn(){
    fn = () =>  { //es7箭头函数
        //setState是批量更新的,不一定是同步的
        // this.setState({num: this.state.num + 1},()=>{
        //     this.setState({num: this.state.num + 1})
        // })
        console.log(React)
        this.setState((prevState) => ({num: prevState.num + 1}));
        this.setState((prevState) => ({num: prevState.num + 1}));
    }
    //卸载组件
    remove = () =>{
<<<<<<< HEAD
        ReactDom.unmountComponentAtNode(window.root)
=======
        ReactDom.unmountComponentAtNode(window.root);
>>>>>>> 5ca25d5d5aeffff67fcb76f3efdbede0a690e420
    }
    render(){
        return (<div>
            {this.state.num}
            <button onClick={this.fn}> + </button>
            <button onClick={this.remove}> 删除组件</button>
        </div>)
    }
}
let person = {
    name : 'person'
}

render(<Person {...person}></Person>, window.root)