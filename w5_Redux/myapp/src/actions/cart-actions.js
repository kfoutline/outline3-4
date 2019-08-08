
/*
	购物车的增删改
 */

export const ADD_TO_CART = 'ADD_TO_CART';
export const UPDATE_CART = 'UPDATE_CART';
export const CHANGE_QTY = 'CHANGE_QTY';
export const DELETE_FROM_CART = 'DELETE_FROM_CART';

export function addToCart(goods) {
  return {
    type: ADD_TO_CART,
    payload: goods
  }
}

export function updateCart(goods) {
  return {
    type: UPDATE_CART,
    payload: goods
  }
}

export function changeQty({id,qty}) {
  return {
    type: CHANGE_QTY,
    payload: {id,qty}
  }
}

export function removeFromCart(goods) {
  return {
    type: DELETE_FROM_CART,
    payload:goods
  }
}