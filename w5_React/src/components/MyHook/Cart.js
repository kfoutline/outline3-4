import React from 'react';
import CartItem from './CartItem'
class Cart extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            goodslist : [
                {
                    id:1,
                    name:'IphoneX',
                    price:9998,
                    qty:1
                },
                {
                    id:2,
                    name:'Huawei Mate30 Pro',
                    price:5998,
                    qty:2
                }
            ]
        }

        this.changeItem = this.changeItem.bind(this);
    }
    changeItem(id,key,val){
        let goodslist = this.state.goodslist.map(item=>{
            if(item.id === id){
                item[key] = val
            }
            return item;
        })

        this.setState({
            goodslist
        })
    }
    render(){
        return (
            <div>
                <div>{JSON.stringify(this.state.goodslist)}</div>
                {
                    this.state.goodslist.map(item=>{
                        return <CartItem key={item.name} item={item} changeItem={this.changeItem}/>
                    })
                }
            </div>
        )
    }
}

export default Cart