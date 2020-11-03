import axios from 'axios'
import { GET_ARTIST, EDIT_ARTIST, CREATE_ARTIST } from './actionConstants'

export const _getArtist = (artist, id) => {
  return {
    type: GET_ARTIST,
    artist,
    id
  }
}

const _createArtist = (artist) => {
  return {
    type: CREATE_ARTIST,
    artist
  }
}

const _editArtist = (artist) => {
  return {
    type: EDIT_ARTIST,
    artist
  }
}

export const getArtist = (id) => {
  return async (dispatch) => {
    const artist = await axios.get(`/api/artists/${id}`)
    dispatch(_getArtist(artist.data))
  }
}

export const editArtist = (artist, id) => {
  return async (dispatch) => {
    const editedArtist = await axios.put(`/api/artists/${id}`, artist)
    dispatch(_editArtist(editedArtist.data))
  }
}

export const createArtist = (artist) => {
  return async (dispatch) => {
    const newArtist = await axios.post('/api/artists/', artist)
    dispatch(_createArtist(newArtist.data))
  }
}

export default function artistReducer(state = {}, action) {
  switch (action.type) {
    case GET_ARTIST:
      return action.artist
    case EDIT_ARTIST:
      return action.artist
    case CREATE_ARTIST:
      return action.artist
    default:
      return state
  }
}
