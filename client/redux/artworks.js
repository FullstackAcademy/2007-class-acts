import axios from 'axios';
import { GET_ARTWORKS } from './actionConstants';

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

export const filterArtworks = (filterObj) => {
  return async (dispatch) => {
    let artworks = (await axios.get('/api/artworks')).data;
    if (filterObj.artist !== "") {
      artworks = artworks.filter(art => {
        return art.artist.id === filterObj.artist
      });
    }
    if (filterObj.genre !== "") {
      artworks = artworks.filter(art => {
        return art.genres
          .map(genre => genre.id)
          .includes(filterObj.genre)
      });
    }
    dispatch(_getArtworks(artworks));
  }
}

export default function artworksReducer(state = [], action) {
  switch (action.type) {
    case GET_ARTWORKS:
      return action.artworks;
    default:
      return state;
  }
}
