import axios from 'axios';
import { GET_GENRES } from './actionConstants';

// ACTION CREATORS
export const _getGenres = genres => {
  return {
    type: GET_GENRES,
    genres
  }
};

// THUNK CREATORS
export const getGenres = () => {
  return async (dispatch) => {
    const genres = await axios.get('/api/genres');
    dispatch(_getGenres(genres.data));
  }
};

export default function genresReducer(state = [], action) {
  switch (action.type) {
    case GET_GENRES:
      return action.genres;
    default:
      return state;
  }
}
