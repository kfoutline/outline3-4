import React,{Component} from 'react';

import MyContext from './context';

class TodoItem extends Component{
    constructor(props,context){
        super();
    }
    render(){
        let {item,idx,selectItem} = this.props
        return (
        <div onClick={selectItem.bind(null,item.id)}>
            {idx+1} <input type="checkbox" checked={item.selected} onClick={(e)=>e.stopPropagation()} onChange={()=>{
                selectItem(item.id)
            }}/>
        </div>
        // <MyContext.Consumer>
        //     {value=>{
        //         return <button>按钮,{value}</button>
        //     }}
        //     </MyContext.Consumer>
        )
    }
}

TodoItem.contextType = MyContext

export default TodoItem;