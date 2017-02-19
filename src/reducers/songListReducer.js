import {REQUEST_SONGS, RECEIVE_SONGS} from '../constants/actionTypes';
import objectAssign from 'object-assign';
import initialState from './initialState';
import SongListFilter from '../utils/SongListFilter';

export default function songListReducer(state = initialState.songList, action) {
  let filter = new SongListFilter();

  switch (action.type) {
    case REQUEST_SONGS:
      return Object.assign({}, state, {
        isFetching: true,
        didInvalidate: false
      });

    case RECEIVE_SONGS:
      console.log('songData='+action.songData.length);
      let songs = filter.filterSongs(action.songData, 'artist', 'top', 'top');
      console.log('songs='+songs.length);
      return Object.assign({}, state, {
        isFetching: false,
        songs,
        songData: action.songData,
      })
      return state;

    default:
      return state;
  }
}
