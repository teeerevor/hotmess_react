import { combineReducers } from 'redux';
import {routerReducer} from 'react-router-redux';
import songList from '../components/SongList/reducer';
import player from '../components/player/reducer';

const rootReducer = combineReducers({
  songList,
  player,
  routing: routerReducer
});

export default rootReducer;


