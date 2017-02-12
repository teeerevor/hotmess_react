import {REQUEST_SONGS, RECEIVE_SONGS} from '../constants/actionTypes';
import objectAssign from 'object-assign';
import initialState from './initialState';

export default function songListReducer(state = initialState.songList, action) {
  let newState;

  switch (action.type) {
    case REQUEST_SONGS:
      return Object.assign({}, state, {
        isFetching: true,
        didInvalidate: false
      });

    case RECEIVE_SONGS:
      return Object.assign({}, state, {
        isFetching: false,
        songs: action.songs,
      })
      return state;

    default:
      return state;
  }
}
