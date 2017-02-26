//import * as types from '../constants/actionTypes';
import {
  FETCH_SONGS_START,
  FETCH_SONGS_SUCCESS,
  FETCH_SONGS_ERROR,
  SHOW_MORE_SONGS,
  TOGGLE_SONG_ORDERING,
} from '../constants/actionTypes';


export const fetchSongsIfRequired = () => (dispatch) =>  {
  let songData = localStorage.getItem('2016');
  if( songData ) {
    const songs = JSON.parse(songData);
    return dispatch(receiveSongs( songs ));
  } else {
    return fetchSongs(dispatch);
  }
}

const fetchSongs = (dispatch)  =>  {
    dispatch(fetchSongsStart());

    let url = 'https://sheetsu.com/apis/v1.0/26abdc6c39f1';
    fetch(url).then(r => r.json())
      .then(data => dispatch(receiveSongs(data, true)))
      .catch(e => console.error(e.toString()));
}

const fetchSongsStart = () => {
  return {
    type: FETCH_SONGS_START
  };
}

const receiveSongs = (songData, newData=false) => {
  if( newData )
    storeSongs(songData);

  return {
    type: FETCH_SONGS_SUCCESS,
    songData: songData,
    receivedAt: Date.now()
  };
}

const storeSongs = (songData) => {
  let dataStr = JSON.stringify(songData);
  localStorage.setItem("2016", dataStr);
  localStorage.setItem("2016_fetched", Date.now());
}

export const showMoreSongs = () => (dispatch) => {
  dispatch({
      type: SHOW_MORE_SONGS,
  });
}

export function changeListSort() {
  dispatch({
      type: CHANGE_SONG_SORT,
  });
}
