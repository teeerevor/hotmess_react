import { combineReducers } from 'redux';
import hottest100 from './hottest100Reducer';
import songList from './songListReducer';
import {routerReducer} from 'react-router-redux';

const rootReducer = combineReducers({
  hottest100,
  songList,
  routing: routerReducer
});

export default rootReducer;
