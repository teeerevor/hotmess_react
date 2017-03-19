import { combineReducers } from 'redux';
import {routerReducer} from 'react-router-redux';
import hottest100 from './hottest100Reducer';
import songList from '../containers/SongList/reducer';
import player from '../containers/player/reducer';

const rootReducer = combineReducers({
  hottest100,
  songList,
  player,
  routing: routerReducer
});

export default rootReducer;


