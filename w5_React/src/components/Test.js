// 引入useState
import React,{useState} from 'react';

class Goods extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            qty:1,
            price:5998
        }

        this.changeQty = this.changeQty.bind(this)
    }
    changeQty(e){
        this.setState({
            qty:e.target.value
        })
    }
    render(){
        let {qty,price} = this.state;
        return (
            <div>
                <h1>商品数量购买案例</h1>
                <h4>Huawei Mate30 Pro</h4>
                <p className="price">价格：{price.toFixed(2)}</p>
                <p>数量：<input type="number" value={qty} onChange={this.changeQty}/></p>
                <p>总价：<span style={{color:'#f00'}}>{(price*qty).toFixed(2)}</span></p>
            </div>
        )
    }
}



export default CartItem;