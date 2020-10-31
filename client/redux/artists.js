import axios from 'axios'
import { GET_ARTISTS, EDIT_ARTIST } from './actionConstants'

// ACTION CREATORS
export const _getArtists = (artists) => {
  return {
    type: GET_ARTISTS,
    artists,
  }
}

// THUNK CREATORS
export const getArtists = () => {
  return async (dispatch) => {
    const artists = await axios.get('/api/artists')
    dispatch(_getArtists(artists.data))
  }
}

export default function artistsReducer(state = [], action) {
  switch (action.type) {
    case GET_ARTISTS:
      return action.artists
    case EDIT_ARTIST:
      return state.map(artist => artist.id === action.artist.id ? action.artist : artist)
    default:
      return state
  }
}
