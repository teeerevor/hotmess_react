import {
  RANDOM_SONG,
  NEXT_SONG,
  PREVIOUS_SONG,
} from './types';

export const playRandomSong = () => (dispatch) =>  {
  dispatch({
      type: RANDOM_SONG,
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
