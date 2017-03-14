import {
  RANDOM_SONG,
} from './types';

export const playRandomSong = () => (dispatch) =>  {
  dispatch({
      type: RANDOM_SONG,
  });
}
