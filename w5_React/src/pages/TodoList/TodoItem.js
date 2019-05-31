import React,{Component} from 'react';

import MyContext from './context';

class TodoItem extends Component{
    constructor(props,context){
        super(props,context);
        console.log(props,context)
    }
    render(){
        
        return <MyContext.Consumer>
            {value=>{
                return <button>按钮,{value}</button>
            }}
            </MyContext.Consumer>
    }
}

TodoItem.contextType = MyContext

export default TodoItem;