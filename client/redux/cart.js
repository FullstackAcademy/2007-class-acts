import axios from 'axios';
import { ADD_CART_ITEM, SET_CART_ITEMS } from './actionConstants';
import { addLocalCartItem } from '../localCart/'

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
export const addCartItem = (cartItem, isLoggedIn = false) => {
  return async (dispatch) => {
    let newCartItem
    //do two different things depending on whether user is loggedIn
    //if logged in, send to the DB, which will return the new cartItem
    if(isLoggedIn) newCartItem = (await axios.post('/api/cart/item', cartItem)).data;
    //if not logged in, write to localStorage
    else newCartItem = addLocalCartItem(cartItem)
    //note that the returned cart item will have the correct additional
    //quantity if the item already in cart
    dispatch(_addCartItem(newCartItem));
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
