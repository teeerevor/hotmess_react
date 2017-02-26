import SongListFilter from '../utils/SongListFilter';
import {
  FETCH_SONGS_START,
  FETCH_SONGS_SUCCESS,
  FETCH_SONGS_ERROR,
  SHOW_MORE_SONGS,
} from '../constants/actionTypes';

export default function songListReducer(
  state = {
    isFetching: false,
    error: null,
    songs: [],
    sortBy: 'artist',
    filterStart: 'top',
    filterEnd: 'top',
  },
  action,
) {

  let filter = new SongListFilter();
  let songs;

  switch (action.type) {
    case FETCH_SONGS_START:
      return {
        ...state,
        isFetching: true,
        didInvalidate: false,
      };

    case FETCH_SONGS_SUCCESS:
      console.log(action.songData.length);
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
