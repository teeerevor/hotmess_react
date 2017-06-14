import {
  TOGGLE_PLAY,
  TOGGLE_MODE,
  PLAY_SONG,
  PAUSE_SONG,
  MODE_SINGLE,
  MODE_CONTINUOUS,
  MODE_RANDOM,
  MODE_REPEAT,
} from './types';

export default function playerReducer(
  state = {
    playing: false,
    mode: MODE_SINGLE,
  },
  action,
) {
  switch (action.type) {
    case TOGGLE_PLAY:{
      return {
        ...state,
        playing: !state.playing,
      };
    }

    case PLAY_SONG:{
      return {
        ...state,
        playing: true,
      };
    }
    case PAUSE_SONG:{
      return {
        ...state,
        playing: false,
      };
    }

    case TOGGLE_MODE:{
      let mode;
      switch(state.mode){
        case MODE_SINGLE:
          mode = MODE_CONTINUOUS;
          break;
        case MODE_CONTINUOUS:
          mode = MODE_REPEAT;
          break;
        case MODE_REPEAT:
          mode = MODE_RANDOM;
          break;
        case MODE_RANDOM:
          mode = MODE_SINGLE;
          break;
      }

      return {
        ...state,
        mode,
      };
    }

    default:
      return state;
  }
}
