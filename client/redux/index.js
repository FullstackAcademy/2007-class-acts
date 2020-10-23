import  { combineReducers } from 'redux';
import artworksReducer from './artworks';
import artworkReducer from './artwork';
import artistsReducer from './artists';
import genresReducer from './genres';
import userReducer from './user'

const reducer = combineReducers({
  artworks: artworksReducer,
  artwork: artworkReducer,
  artists: artistsReducer,
  genres: genresReducer,
  user: userReducer
});

export default reducer;
