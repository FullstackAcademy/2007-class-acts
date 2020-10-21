import axios from 'axios';
import { GET_ARTWORKS, FILTER_ARTWORKS_ARTIST, FILTER_ARTWORKS_GENRE } from './actionConstants';

// ACTION CREATORS
export const _getArtworks = artworks => {
  return {
    type: GET_ARTWORKS,
    artworks
  }
};

export const _filterArtworksArtist = (category, value) => {
  return {
    type: FILTER_ARTWORKS_ARTIST,
    category,
    value
  }
}

export const _filterArtworksGenre = (category, value) => {
  return {
    type: FILTER_ARTWORKS_GENRE,
    category,
    value
  }
}

// THUNK CREATORS
export const getArtworks = () => {
  return async (dispatch) => {
    const artworks = await axios.get('/api/artworks');
    dispatch(_getArtworks(artworks.data));
  }
};

export const filterArtworks = (category, value) => {
  return (dispatch) => {
    category === 'artist' ? dispatch(_filterArtworksArtist(category, value)) : dispatch(_filterArtworksGenre(category, value));
  }
}

export default function artworksReducer(state = [], action) {
  switch (action.type) {
    case GET_ARTWORKS:
      return action.artworks;
    case FILTER_ARTWORKS_ARTIST:
      return state.filter(art => art[action.category].id === action.value);
    case FILTER_ARTWORKS_GENRE:
      return state.filter(art => {
        return art[action.category]
          .map(genre => genre.id)
          .includes(action.value)
      });
    default:
      return state;
  }
}
