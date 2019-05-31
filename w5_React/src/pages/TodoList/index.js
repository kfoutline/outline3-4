import React,{Component} from 'react';

import TodoContent from './TodoContent';

import MyContext from './context';

class TodoList extends Component{

    render(){
        return (
        <MyContext.Provider value="dark">
            <TodoContent/>
        </MyContext.Provider>
        )
    }
}

export default TodoList;