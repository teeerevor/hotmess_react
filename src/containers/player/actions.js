import {
  TOGGLE_PLAY,
  TOGGLE_MODE,
  RANDOM_SONG,
  NEXT_SONG,
  PREVIOUS_SONG,
} from './types';

export const togglePlay = () => (dispatch) =>  {
  dispatch({
      type: TOGGLE_PLAY,
  });
}

export const toggleMode = () => (dispatch) =>  {
  dispatch({
      type: TOGGLE_MODE,
  });
}

export const playNextSong = () => (dispatch) =>  {
  dispatch({
      type: NEXT_SONG,
  });
}

export const playPrevSong = () => (dispatch) =>  {
  dispatch({
      type: PREVIOUS_SONG,
  });
}


export const playRandomSong = () => (dispatch) =>  {
  dispatch({
      type: RANDOM_SONG,
  });
}
