import axios from 'axios';
import { GET_ARTWORKS, ADD_ARTWORK } from './actionConstants';

// ACTION CREATORS
export const _getArtworks = artworks => {
  return {
    type: GET_ARTWORKS,
    artworks
  }
};

// THUNK CREATORS
export const getArtworks = () => {
  return async (dispatch) => {
    const artworks = await axios.get('/api/artworks');
    dispatch(_getArtworks(artworks.data));
  }
};

export default function artworksReducer(state = [], action) {
  switch (action.type) {
    case GET_ARTWORKS:
      return action.artworks;
    case ADD_ARTWORK:
      return [action.artwork, ...state]
    default:
      return state;
  }
}
