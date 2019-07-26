import  { ADD_TO_CART,UPDATE_CART,DELETE_FROM_CART }  from '../actions/cart-actions';
import {Map,List} from 'immutable';
const initialState = Map({
  cart: List([
    Map({
      proName: 'bread 700g',
      proId:1,
      qty: 2,
      proPrice: 90
    }),
    Map({
      proName: 'milk 500ml',
      proId:2,
      qty: 1,
      proPrice: 47
    })
  ])
});


export default function(state=initialState, action) {
  switch (action.type) {
    case ADD_TO_CART:console.log(111)
      // return {
      //   ...state,
      //   cart: [...state.cart, action.payload]// Immutable.set()
      // }
      let cart = state.get('cart').unshift(action.payload);
      state.update('cart',cart);
      return state.toJS();

    case UPDATE_CART:
      // return{
      //   ...state,
      //   cart:state.cart.map(item=>{
      //     // 更新原理：遍历所有商品，找到对应的商品更新数据，其他保持不变
      //     return item.proId===action.payload.proId ? Object.assign(item,action.payload) : item;
      //   })
      // }
      // state.get('cart').filter(item=>item)
      return state.updataIn(['cart'])


      case DELETE_FROM_CART:
        return {
          ...state,
          cart:state.cart.filter(item=>{
            return item.proId !== action.payload.proId
          })
        }

    default:
      return state.toJS();
  }
}