import axios from 'axios'
import { GET_USERS, DESTROY_USER, UPDATE_USER } from './actionConstants'

// ACTION CREATORS
export const _getUsers = (users) => {
  return {
    type: GET_USERS,
    users,
  }
};

export const _destroyUser = (user) => ({
  type: DESTROY_USER,
  user

})

export const _updateUser = (user) => ({
  type: UPDATE_USER,
  user
})


// THUNK CREATORS
export const getUsers = () => {
  return async (dispatch) => {
    const users = await axios.get('/api/users');
    dispatch(_getUsers(users.data));
  }
};

export const destroyUser = (user) => {
  return async (dispatch) => {
    try {
      await axios.delete(`/api/users/${user.id}`)
      dispatch(_destroyUser(user))
    } catch (err) {
      console.log(err)
    }
  }
}

// Need to add the updateUser thunk
export const updateUser = (user) => {
  return async (dispatch) => {
    try {
      const updatedUser = await axios.put(`/api/users/${user.id}`, user)
      dispatch(_updateUser(updatedUser.data))
    } catch (err) {
      console.log(err)
    }
  }
}

export default function usersReducer(state = [], action) {
  switch (action.type) {
    case GET_USERS:
      return action.users
    default:
      return state
  }
}
