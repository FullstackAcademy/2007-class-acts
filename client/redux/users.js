import axios from 'axios'
import { GET_USERS } from './actionConstants'

// ACTION CREATORS
export const _getUsers = (users) => {
  return {
    type: GET_USERS,
    users,
  }
}

// THUNK CREATORS
export const getUsers = () => {
  return async (dispatch) => {
    const users = await axios.get('/api/users')
    dispatch(_getUsers(users.data))
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
