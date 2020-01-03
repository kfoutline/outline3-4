import React,{useState,useEffect} from 'react';

function CartItem({item,changeItem}){
    let [qty,changeQty] = useState(item.qty);
    useEffect(()=>{
        changeItem(item.id,'qty',qty);
    })
    return <div>
        <h4>{item.name}</h4>
        <p className="price">价格：{item.price}</p>
        <p><input type="number" value={qty} onChange={(e)=>{
            changeQty(e.target.value)
        }}/></p>
    </div>
}

export default CartItem;