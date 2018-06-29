let React = {
    createElement(type, props , ...children){ //类型,属性,儿子
        return {type , props , children}
    }
}
function render(vnode,container){
    console.log(vnode)
    console.log(typeof vnode === "string")
    if(typeof vnode === "string"){
        return container.appendChild(document.createTextNode(vnode));
    }
    let {type, props, children} = vnode;
    let ele = document.createElement(type);
    for (let key in props){
        ele.setAttribute(key, props[key])
    }
    children.forEach(child => {
        render(child, ele) //循环子节点,插入到页面中
    });
    container.appendChild(ele);
}
let element = <h1 className="hello">hello baby <span className="spanclass">child</span></h1>
console.log(element);

render(element , document.getElementById('root'))
//  export default Home;
