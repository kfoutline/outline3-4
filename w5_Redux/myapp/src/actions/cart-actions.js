
/*
	购物车的增删改
 */

export const ADD_TO_CART = 'ADD_TO_CART';
export const UPDATE_CART = 'UPDATE_CART';
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

export function removeFromCart(goods) {
  return {
    type: DELETE_FROM_CART,
    payload:goods
  }
}