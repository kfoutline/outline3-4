import  { ADD_TO_CART,CHANGE_QTY,DELETE_FROM_CART }  from '../actions/cart-actions';
import {isImmutable,Map,List,fromJS} from 'immutable';
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
  let idx;
  // 判断state是否为immutable
  if(!isImmutable(state)){
    state = fromJS(state)
  }

  
  switch (action.type) {
    case ADD_TO_CART:
      // return {
      //   ...state,
      //   cart: [...state.cart, action.payload]// Immutable.set()
      // }
      // let cart = state.get('cart').unshift(action.payload);
      let cart = state.get('cart').insert(0,Map(action.payload))
      state = state.update('cart',()=>cart);console.log('state:',cart.get(0))
      return state.toJS();

    case CHANGE_QTY:
      // return{
      //   ...state,
      //   cart:state.cart.map(item=>{
      //     // 更新原理：遍历所有商品，找到对应的商品更新数据，其他保持不变
      //     return item.proId===action.payload.proId ? Object.assign(item,action.payload) : item;
      //   })
      // }
      idx = state.get('cart').findIndex(item=>item.id===action.payload.id)
      return state.updateIn(['cart',idx,'qty'],action.payload.qty)


      case DELETE_FROM_CART:
        // return {
        //   ...state,
        //   cart:state.cart.filter(item=>{
        //     return item.proId !== action.payload.proId
        //   })
        // }
        idx = state.get('cart').findIndex((item)=>item.id===action.payload)
        return state.deleteIn(['cart',idx])

    default:
      return state.toJS();
  }
}