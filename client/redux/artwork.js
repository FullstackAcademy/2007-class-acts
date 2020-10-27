import axios from 'axios'
import { GET_ARTWORK, ADD_ARTWORK } from './actionConstants';

export const _getArtwork = artwork => {
  return {
    type: GET_ARTWORK,
    artwork
  }
}

const _addArtwork = (artwork) => {
  return {
    type: ADD_ARTWORK,
    artwork
  }
}

export const getArtwork = (id) => {
  return async (dispatch) => {
    try {
      const artwork = (await axios.get(`/api/artworks/${id}`)).data
      dispatch(_getArtwork(artwork))
    } catch (error) {
      console.log(error)
    }
  }
};

export const addArtwork = (artwork) => {
  return async (dispatch) => {
    try {
      const newArtwork = await axios.post('api/artworks', artwork) //double check api routes
      dispatch(_addArtwork(newArtwork.data))
    } catch (err) {
      console.log(err)
    }
  }
}

export default function artworkReducer(state = {}, action) {
  switch (action.type) {
    case GET_ARTWORK:
      return action.artwork
    case ADD_ARTWORK:
      return action.artwork
    default:
      return state
  }
}
