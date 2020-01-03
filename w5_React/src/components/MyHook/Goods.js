import React from 'react';
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
export default Goods

/* // 引入useState
import React,{useState} from 'react';

function Goods(){
    let price = 5998;
    // 使用useState创建一个数据qty，并解构该值的初始值与修改值的方法
    let [qty,changeQty] = useState(1);
    return <div>
        <h1>商品数量购买案例</h1>
        <h4>Huawei Mate30 Pro</h4>
        <p className="price">价格：{price.toFixed(2)}</p>
        <p>数量：<input type="number" value={qty} onChange={(e)=>{
            // 利用解构出来的changeQty方法来改变qty的值，qty被修改后，Goods组件会被自动刷新
            changeQty(e.target.value);
        }}/></p>
        <p>总价：<span style={{color:'#f00'}}>{(price*qty).toFixed(2)}</span></p>
    </div>
}
export default Goods */