import {REQUEST_SONGS, RECEIVE_SONGS, SHOW_MORE_SONGS} from '../constants/actionTypes';
import initialState from './initialState';
import SongListFilter from '../utils/SongListFilter';

export default function songListReducer(state = initialState.songList, action) {
  let filter = new SongListFilter();
  let songs;

  switch (action.type) {
    case REQUEST_SONGS:
      return {
        ...state,
        isFetching: true,
        didInvalidate: false,
      };

    case RECEIVE_SONGS:
      songs = filter.filterSongs(action.songData, state.sortBy, state.filterStart, state.filterEnd);
      return {
        ...state,
        isFetching: false,
        songs,
        songData: action.songData,
      };

    case SHOW_MORE_SONGS:
      let nextEnd = filter.getNextLetter(state.filterEnd);
      songs = filter.filterSongs(state.songData, state.sortBy, state.filterStart, nextEnd);
      return {
        ...state,
        songs,
        filterEnd: nextEnd,
      };

    default:
      return state;
  }
}
