import  { combineReducers } from 'redux';
import artworksReducer from './artworks';
import artistsReducer from './artists';
import genresReducer from './genres';

const reducer = combineReducers({
  artworks: artworksReducer,
  artists: artistsReducer,
  genres: genresReducer
});

export default reducer;
