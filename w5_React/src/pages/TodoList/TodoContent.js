import React,{Component} from 'react';

import TodoItem from './TodoItem';

class TodoContent extends Component{
    constructor(props){
        super(props);
        this.state = {
            checkAll:props.datalist.every(item=>item.selected)
        }
    }
    componentDidUpdate(prevProps,prevState){
        console.log('did:',prevProps.datalist.map(item=>item.selected),this.props.datalist.map(item=>item.selected));
        if(this.state.checkAll != this.props.datalist.every(item=>item.selected)){
            this.setState({
                checkAll:this.props.datalist.every(item=>item.selected)
            })
        }
    }
    render(){
        let {datalist,selectItem} = this.props
        return (
            <div>
                <input type="checkbox" checked={this.state.checkAll} onChange={(e)=>{
                    this.setState({
                        checkAll:e.target.checked
                    });
                    selectItem(e.target.checked)
                }} />全选
                {datalist.map((item,idx)=>{
                    return <TodoItem key={idx} selectItem={selectItem} item={item} idx={idx}/>
                })}
                
            </div>
        )
    }
}

export default TodoContent;