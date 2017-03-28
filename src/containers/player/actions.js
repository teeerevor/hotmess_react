import {
  TOGGLE_PLAY,
  TOGGLE_MODE,
  RANDOM_SONG,
  NEXT_SONG,
  PLAY_SONG,
  PAUSE_SONG,
  PREVIOUS_SONG,
  SONG_ENDED,
} from './types';

export const togglePlay = () => (dispatch) =>
  dispatch({ type: TOGGLE_PLAY });

export const toggleMode = () => (dispatch) =>
  dispatch({ type: TOGGLE_MODE });

export const playSong = () => (dispatch) =>
  dispatch({ type: PLAY_SONG });

export const pauseSong = () => (dispatch) =>
  dispatch({ type: PAUSE_SONG });

export const playNextSong = () => (dispatch) =>
  dispatch({ type: NEXT_SONG });

export const playPrevSong = () => (dispatch) =>
  dispatch({ type: PREVIOUS_SONG });

export const playRandomSong = () => (dispatch) =>
  dispatch({ type: RANDOM_SONG });

export const songEnded = () => (dispatch) =>
  dispatch({ type: SONG_ENDED });
