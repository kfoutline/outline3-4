import React,{Component} from 'react';

import TodoContent from './TodoContent';

import MyContext from './context';


class TodoList extends Component{
    constructor(){
        super();

        this.state = {
            datalist:[{
                id:Date.now(),
                selected:false,
            },{
                id:Date.now()+10,
                selected:true,
            }]
        }

        this.selectItem = this.selectItem.bind(this)
    }
    selectItem(id){
        let {datalist} = this.state;
        if(typeof id === 'boolean'){
            datalist = datalist.map(item=>{
                
                    item.selected = id
                return item;
            })
        }else{

            datalist = datalist.map(item=>{
                if(item.id === id){
                    item.selected = !item.selected
                }
                return item;
            });
            
        }
        this.setState({
            datalist
        })
    }
    render(){
        return (
        <MyContext.Provider value="dark">
            <TodoContent datalist={this.state.datalist} selectItem={this.selectItem}/>
        </MyContext.Provider>
        )
    }
}

export default TodoList;