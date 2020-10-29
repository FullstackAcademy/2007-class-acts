import axios from 'axios'
import { SET_USER } from './actionConstants'
import { setCartItems } from './cart'


//ACTION CREATOR
export const setUser = (user) => ({
  type: SET_USER,
  user
})

//THUNK CREATOR
export const getUser = (sessionId) => {
  return async (dispatch) => {
    const user = await axios.get(`/api/users/${sessionId}`)
    dispatch(setUser(user.data))
  }
}

export const destroySession = (sessionId) => {
  return async (dispatch) => {
    await axios.delete(`/api/users/${sessionId}`)
    dispatch(setUser({}))
  }
}

export default function userReducer(state = {}, action) {
  switch (action.type) {
    case SET_USER:
      return action.user;
    default:
      return state
  }
}



