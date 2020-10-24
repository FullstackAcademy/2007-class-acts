import axios from 'axios'
import { ADD_TO_CART, SET_CART } from './actionConstants';

// ACTION CREATORS
export const _addToCart = (cartItem) => {
  return {
    type: ADD_TO_CART,
    cartItem
  }
};

export const _setCart = cart => {
  return {
    type: SET_CART,
    cart
  }
}

// THUNK CREATORS
export const addToCart = (cartItem) => {
  return async (dispatch) => {
    //send the cartItem to database
    await axios.post(`/api/cart/item`, cartItem)
    dispatch(_addToCart(cartItem));
  }
};

export const setCart = cart => {
  return (dispatch) => {
    //send the whole cart to DB
    dispatch(_setCart(cart))
  }
}

export default function cartReducer(state = [], action) {
  switch (action.type) {
    case ADD_TO_CART:
      return [...state, action.cartItem]
    case SET_CART:
      return action.cart
    default:
      return state;
  }
}
