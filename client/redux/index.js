import  { combineReducers } from 'redux';
import artworksReducer from './artworks';
import artistsReducer from './artists';
import genresReducer from './genres';
import userReducer from './user'

const reducer = combineReducers({
  artworks: artworksReducer,
  artists: artistsReducer,
  genres: genresReducer,
  user: userReducer
});

export default reducer;
