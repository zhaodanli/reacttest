//生命周期

import  React , {Component} from 'react';
import ReactDom,{render} from 'react-dom'; 

class ChildCounter extends Component{
    constructor(){
        super();
        this.state = {};
    }
    // 挂载之前,改组件会触发多次(不推荐使用),可以在constrctor初始化值
    // componentWillMount(){
    //     console.log("child将要挂载");
        
    // }
    render(){
        return <div>{this.props.num}</div>
    }
    // componentWillUpdate(){
    //     console.log("child更新完成");
    // }
    componentDidMount(){
        console.log(this.state.num);
        
        console.log("child挂载完成");
    }
    static getDerivedStateFromProps(newProps){
        //ChildCounter使用getDerivedStateFromProps（），但也包含以下传统生命周期：
        //   componentWillMount
        //   componentWillReceiveProps
        //   componentWillUpdate

        // 应删除上述生命周期
        console.log("接受新属性新");
        return {num : 1} //会将之前的状态覆盖掉
        
    }
    getSnapshotBeforeUpdate(prevProps , prevState){//更新前的属性和更新前的状态
        console.log("更新前的属性和状态" + prevProps + prevState);
        return '123'; //返回的值会传到componentDidUpdate里去
    }
    componentDidUpdate(a,b,c){
        console.log("配合getSnapshotBeforeUpdate更新完毕" , a,b,c);
        
    }

    // //第一次不会执行，而且是唯一可以调用setState属性，已经被替换了
    // componentWillReceiveProps(newProps){//接收到新的属性之后才会执行
    //     console.log("child接受到新属性");
        
    // }
    //只要调用setStat就会更新视图  返回false不更新   优化  immutablejs 
    shouldComponentUpdate(nextProps , nextState){
        console.log("child将要更新视图");
        return true;
    }
}
class Person extends Component{
    //内部可以声明状态,获取属性
    constructor(props){
        super();
        this.state = {num: 0}
        //this.fn = this.fn.bind(this)
    }
    // fn(){
    fn = () =>  { 
        this.setState((prevState) => ({num: prevState.num + 1}));
        // this.time = setInterval(()=>{
        //     this.setState((prevState) => ({num: prevState.num + 1}));
        // },1000)
    }
    // 挂载之前,改组件会触发多次(不推荐使用),可以在constrctor初始化值
    componentWillMount(){
        console.log("将要挂载");
        
    }
    //卸载组件
    remove = () =>{
        console.log("销毁");
        ReactDom.unmountComponentAtNode(window.root)
    }
    //组件销毁之前
    componentWillUnmount(){
        console.log("销毁之前");
        clearInterval(this.time)
    }
    render(){
        console.log("渲染");
        return (<div>
            {this.state.num}
            <button onClick={this.fn}> + </button>
            <button onClick={this.remove}> 删除组件</button>
            <ChildCounter num={this.state.num}></ChildCounter>
        </div>)
    }
    //组件挂载完成
    componentDidMount(){
        console.log("组件挂载完成");
        
    }
    //只要调用setStat就会更新视图  返回false不更新   优化  immutablejs 
    shouldComponentUpdate(nextProps , nextState){
        console.log("更新视图");
        return nextState.num%2;
    }
}
let person = {
    name : 'person'
}

render(<Person {...person}></Person>, window.root)