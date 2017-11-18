import _ from 'lodash';
import {
  TOGGLE_SONG_VIEW,
  SHORTLIST_SONG_TOP,
  SHORTLIST_SONG,
  DELIST_SONG,
} from './types';

export default function songReducer(
  state = {
    openSongs: [],
    currentSong: {},
    shortlist: [],
  },
  action,
) {
  switch (action.type) {
    case TOGGLE_SONG_VIEW: {
      let openSongs;
      let songIsOpen = _.includes(state.openSongs, action.songId);
      if( songIsOpen )
        openSongs = _.without(state.openSongs, action.songId);
      else
        openSongs = _.concat(state.openSongs, action.songId);

      return {
        ...state,
        openSongs,
      };
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
