import axios from 'axios';
import { GET_USERS, DESTROY_USER } from './actionConstants';

// ACTION CREATORS
export const _getUsers = users => {
  return {
    type: GET_USERS,
    users
  }
};

export const _destroyUser = (user) => ({
  type: DESTROY_USER,
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
      await axios.put(`/api/users/${user.id}`)
      dispatch(_destroyUser(user))
    } catch (err) {
      console.log(err)
    }
  }
}


export default function usersReducer(state = [], action) {
  switch (action.type) {
    case GET_USERS:
      return action.users;
    case DESTROY_USER:
      return state.filter(user => user.id !== action.user.id)
    default:
      return state;
  }
}
