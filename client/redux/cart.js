import axios from 'axios';
import { ADD_CART_ITEM, SET_CART_ITEMS, ADD_MULTIPLE_CART_ITEMS, CHANGE_CART_ITEM, REMOVE_CART_ITEM, SET_USER } from './actionConstants';
import { addLocalCartItem, changeLocalCartItem, removeLocalCartItem } from '../localCart/'

// ACTION CREATORS
export const _addCartItem = cartItem => {
  return {
    type: ADD_CART_ITEM,
    cartItem
  }
};

export const _changeCartItem = cartItem => {
  return {
    type: CHANGE_CART_ITEM,
    cartItem
  }
};

export const _removeCartItem = cartItem => {
  return {
    type: REMOVE_CART_ITEM,
    cartItem
  }
};

export const _setCartItems = cartItems => {
  return {
    type: SET_CART_ITEMS,
    cartItems
  }
}

export const _addMultipleCartItems = cartItems => {
  return {
    type: ADD_MULTIPLE_CART_ITEMS,
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

export const changeCartItem = (cartItem, isLoggedIn = false) => {
  return async (dispatch) => {
    let updatedCartItem
    //do two different things depending on whether user is loggedIn
    //if logged in, send to the DB, which will return the updated cartItem
    if(isLoggedIn) updatedCartItem = (await axios.put('/api/cart/item', cartItem)).data;
    //if not logged in, write to localStorage
    else updatedCartItem = changeLocalCartItem(cartItem)
    //note that the returned cart item will have the correct new qty
    dispatch(_changeCartItem(updatedCartItem));
  }
};

export const removeCartItem = (cartItem, isLoggedIn = false) => {
  return async (dispatch) => {
    let deleteSuccessful
    //do two different things depending on whether user is loggedIn
    //if logged in, send to the DB,
    //which will **NOT** return the deleted cartItem, so we
    //have to dispatch the original cart item if we succeed in deleting
    if(isLoggedIn) deleteSuccessful = (await axios.delete(`/api/cart/item/${cartItem.id}`)).status;
    //if not logged in, write to localStorage
    else deleteSuccessful = removeLocalCartItem(cartItem)
    //if the cart item was deleted, you should get back status 204
    //then dispatch the original cart item for the reducer
    if(deleteSuccessful === 204) {
      dispatch(_removeCartItem(cartItem));
    }
  }
};

export const addMultipleCartItems = (cartItems) => {
  return async (dispatch) => {
    //if you log in and have multiple cart items, this sends all at once so that only one cartID is associated with each cartItem
    const newCartItems = (await axios.post('/api/cart/items', cartItems)).data;
    dispatch(_addMultipleCartItems(newCartItems));
  }
}

export const setCartItems = (cartItems) => {
  return (dispatch) => {
    dispatch(_setCartItems(cartItems));
  }
};

export default function cartReducer(state = [], action) {
  switch (action.type) {
    case ADD_CART_ITEM:
      return [...state.filter(item => item.artworkId !== action.cartItem.artworkId), action.cartItem];
    //this duplicates the ADD_CART_ITEM action, but I think that's ok bc it's clearer
    case CHANGE_CART_ITEM:
      return [...state.filter(item => item.artworkId !== action.cartItem.artworkId), action.cartItem];
    case REMOVE_CART_ITEM:
      return [...state.filter(item => item.artworkId !== action.cartItem.artworkId)];
    case ADD_MULTIPLE_CART_ITEMS:
      return [...state.filter(item => !action.cartItems
        .map(item => item.artworkId)
        .includes(item.artworkId)), ...action.cartItems]
    case SET_CART_ITEMS:
      return [...action.cartItems]
    case SET_USER:
      if (action.user.cart && action.user.cart.cartItems) return [...action.user.cart.cartItems]
      return state
    default:
      return state;
  }
}
