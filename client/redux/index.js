import  { combineReducers } from 'redux';
import artworksReducer from './artworks';

const reducer = combineReducers({
  artworks: artworksReducer,
});

export default reducer;
