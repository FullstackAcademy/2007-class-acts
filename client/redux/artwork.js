import axios from 'axios'
import { GET_ARTWORK } from './actionConstants';

export const _getArtwork = artwork => {
  return {
        type: GET_ARTWORK,
        artwork
    }
}

export const getArtwork = (id) => {
    return async (dispatch) => {
      try {
        const artwork = await (await axios.get(`/api/artworks/${id}`)).data
        dispatch(_getArtwork(artwork))
      } catch (error) {
        console.log(error)
      }
    }
  };


export default function artworkReducer( state = [], action) {
    if (action.type === GET_ARTWORK){
        state = action.artwork
        return state
    }
    return state
}
