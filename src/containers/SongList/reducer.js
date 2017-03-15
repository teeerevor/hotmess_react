import _ from 'lodash';
import SongListFilter from '../../utils/SongListFilter';
import {
  FETCH_SONGS_START,
  FETCH_SONGS_SUCCESS,
  SHOW_MORE_SONGS,
  SHOW_SONGS_STARTING_WITH,
  TOGGLE_SONG_ORDERING,
  TOGGLE_SONG_VIEW,
  SHORTLIST_SONG_TOP,
  SHORTLIST_SONG,
  DELIST_SONG,
  JUMP_TO_SONG,
  RANDOM_SONG,
  NEXT_SONG,
  PREVIOUS_SONG,
} from './types';


export default function songListReducer(
  state = {
    isFetching: false,
    error: null,
    songs: [],
    openSongs: [],
    currentSong: {},
    shortlist: [],
    sortBy: 'artist',
    filterStart: 'top',
    filterEnd: 'top',
  },
  action,
) {

  const filter = new SongListFilter();
  const jumpToSong = ( state, song) => {
      const {songData, sortBy} = state;
      const openSongs = [song.id];

      const name = state.sortBy === 'song' ? song.name: song.artist;
      const filterLetter = filter.checkLetter(name.charAt(0));

      const songs = filter.filterSongs(songData, sortBy, filterLetter, filterLetter);
      return {
        ...state,
        songs,
        openSongs,
        filterStart: filterLetter,
        filterEnd: filterLetter,
        currentSong: song,
      };
  };

  switch (action.type) {
    case FETCH_SONGS_START:
      return {
        ...state,
        isFetching: true,
        didInvalidate: false,
      };

    case FETCH_SONGS_SUCCESS: {
      const songs = filter.filterSongs(action.songData, state.sortBy, state.filterStart, state.filterEnd);
      return {
        ...state,
        isFetching: false,
        songs,
        songData: action.songData,
      };
    }

    case SHOW_MORE_SONGS: {
      const nextEnd = filter.getNextLetter(state.filterEnd);
      const songs = filter.filterSongs(state.songData, state.sortBy, state.filterStart, nextEnd);
      return {
        ...state,
        songs,
        filterEnd: nextEnd,
      };
    }

    case SHOW_SONGS_STARTING_WITH: {
      const songs = filter.filterSongs(state.songData, state.sortBy, action.index, action.index);
      return {
        ...state,
        songs,
        filterStart: action.index,
        filterEnd: action.index,
      };
    }

    case TOGGLE_SONG_ORDERING: {
      let {songData, sortBy} = state;
      if (sortBy == 'song'){
        sortBy = 'artist';
        songData = _.sortBy(songData, ['artist', 'name']);
      } else {
        sortBy = 'song';
        songData = _.sortBy(songData, ['name', 'artist']);
      }

      const songs = filter.filterSongs(songData, sortBy, state.filterStart, state.filterEnd);
      return {
        ...state,
        songs,
        songData,
        sortBy,
      };

    }

    case TOGGLE_SONG_VIEW: {
      let {openSongs, currentSong} = state;
      let songIsOpen = _.includes(openSongs, action.songId);
      if( songIsOpen ) {
        openSongs = _.without(openSongs, action.songId);
      } else {
        openSongs = _.concat(openSongs, action.songId);
        currentSong = action.song;
      }

      return {
        ...state,
        openSongs,
        currentSong,
      };
    }

    case RANDOM_SONG: {
      const songNumber = Math.round(Math.random() * state.songData.length);
      const randomSong = state.songData[songNumber];

      return jumpToSong(state, randomSong);
    }

    case NEXT_SONG: {
      const { currentSong, songs } = state
      const currentIndex = _.findIndex(songs, (s) => { return s.id == currentSong.id; });
      const nextSong = songs[ currentIndex + 1 ];
      return jumpToSong(state, nextSong);
    }

    case PREVIOUS_SONG: {
      const { currentSong, songs, songData } = state
      let previousSong;
      let currentIndex = _.findIndex(songs, (s) => { return s.id == currentSong.id; });
      if (currentIndex > 0){
        previousSong = songs[ currentIndex - 1 ];
      } else {
        currentIndex = _.findIndex(songData, (s) => { return s.id == currentSong.id; });
        previousSong = songData[ currentIndex - 1 ];
      }
      return jumpToSong(state, previousSong);
    }

    case JUMP_TO_SONG:{
      return jumpToSong(state, action.song);
    }

    case SHORTLIST_SONG:{
      return {
        ...state,
        shortlist: _.concat(state.shortlist, action.songId)
      };
    }

    case SHORTLIST_SONG_TOP:{
      return {
        ...state,
        shortlist: _.concat([action.songId], state.shortlist)
      };
    }

    case DELIST_SONG:{
      return {
        ...state,
        shortlist: _.without(state.shortlist, action.songId)
      };
    }
    default:
      return state;
  }
}
