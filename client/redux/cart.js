import axios from 'axios';
import { ADD_CART_ITEM, SET_CART_ITEMS } from './actionConstants';

// ACTION CREATORS
export const _addCartItem = cartItem => {
  return {
    type: ADD_CART_ITEM,
    cartItem
  }
};

export const _setCartItems = cartItems => {
  return {
    type: SET_CART_ITEMS,
    cartItems
  }
}

// THUNK CREATORS
export const addCartItem = (cartItem) => {
  return async (dispatch) => {
    const newCartItem = await axios.post('/api/cart/item', cartItem);
    dispatch(_addCartItem(newCartItem.data));
  }
};

export const setCartItems = (cartItems) => {
  return (dispatch) => {
    dispatch(_setCartItems(cartItems));
  }
};

export default function cartReducer(state = [], action) {
  switch (action.type) {
    case ADD_CART_ITEM:
      return [...state.filter(item => item.artworkId !== action.cartItem.artworkId), action.cartItem];
    case SET_CART_ITEMS:
      return [...action.cartItems]
    default:
      return state;
  }
}
