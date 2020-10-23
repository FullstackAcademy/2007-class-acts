import  { combineReducers } from 'redux';
import artworksReducer from './artworks';
import artworkReducer from './artwork';
import artistsReducer from './artists';
import genresReducer from './genres';

const reducer = combineReducers({
  artworks: artworksReducer,
  artwork: artworkReducer,
  artists: artistsReducer,
  genres: genresReducer
});

export default reducer;
