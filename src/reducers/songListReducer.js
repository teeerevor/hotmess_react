import SongListFilter from '../utils/SongListFilter';
import {
  FETCH_SONGS_START,
  FETCH_SONGS_SUCCESS,
  FETCH_SONGS_ERROR,
  SHOW_MORE_SONGS,
  TOGGLE_SONG_ORDERING,
  SHOW_SONGS_STARTING_WITH,
} from '../constants/actionTypes';

import _ from 'lodash';

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

    case TOGGLE_SONG_ORDERING:
      let {songData, sortBy} = state;
      if (sortBy == 'song'){
        sortBy = 'artist'
        songData = _.sortBy(songData, ['artist', 'name']);
      } else {
        sortBy = 'song'
        songData = _.sortBy(songData, ['name', 'artist']);
      }

      songs = filter.filterSongs(songData, sortBy, state.filterStart, state.filterEnd);
      return {
        ...state,
        songs,
        songData,
        sortBy,
      };

    case SHOW_SONGS_STARTING_WITH:
      console.log(action.index);
      songs = filter.filterSongs(state.songData, state.sortBy, action.index, action.index);
      return {
        ...state,
        songs,
        filterStart: action.index,
        filterEnd: action.index,
      };

    default:
      return state;
  }
}
