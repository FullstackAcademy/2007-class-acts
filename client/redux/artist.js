import { GET_ARTIST, EDIT_ARTIST } from './actionConstants'

const _getArtist = (artist) => {
  return {
    type: GET_ARTIST,
    artist
  }
}

const artistReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_ARTIST:
      return action.artist
    case EDIT_ARTIST:
      return action.artist
    default:
      return state
  }
}
