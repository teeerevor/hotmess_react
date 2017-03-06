import {
  FETCH_SONGS_START,
  FETCH_SONGS_SUCCESS,
  SHOW_MORE_SONGS,
  SHOW_SONGS_STARTING_WITH,
  TOGGLE_SONG_ORDERING,
  TOGGLE_SONG_VIEW,
} from './types';

export const fetchSongsIfRequired = () => (dispatch) =>  {
  const songData = localStorage.getItem('2016');
  if( songData ) {
    const songs = JSON.parse(songData);
    return dispatch(receiveSongs( songs ));
  } else {
    return fetchSongs(dispatch);
  }
};

const fetchSongs = (dispatch)  =>  {
    dispatch(fetchSongsStart());

    const url = 'https://sheetsu.com/apis/v1.0/26abdc6c39f1';
    fetch(url).then(r => r.json())
      .then(data => dispatch(receiveSongs(data, true)))
      .catch(e => console.error(e.toString()));
};

const fetchSongsStart = () => {
  return {
    type: FETCH_SONGS_START
  };
};

const receiveSongs = (songData, newData=false) => {
  if( newData )
    storeSongs(songData);

  return {
    type: FETCH_SONGS_SUCCESS,
    songData: songData,
    receivedAt: Date.now()
  };
};

const storeSongs = (songData) => {
  const dataStr = JSON.stringify(songData);
  localStorage.setItem("2016", dataStr);
  localStorage.setItem("2016_fetched", Date.now());
};

export const showMoreSongs = () => (dispatch) => {
  dispatch({
      type: SHOW_MORE_SONGS,
  });
};

export const toggleSortOrder = () => (dispatch) => {
  dispatch({
      type: TOGGLE_SONG_ORDERING,
  });
};

export const showSongAtIndex = (index) => (dispatch) => {
  dispatch({
      type: SHOW_SONGS_STARTING_WITH,
      index: index,
  });
};

export const toggleSongView = (songId) => (dispatch) => {
  dispatch({
      type: TOGGLE_SONG_VIEW,
      songId,
  });
};
