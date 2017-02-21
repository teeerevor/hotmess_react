//import * as types from '../constants/actionTypes';
import {REQUEST_SONGS, RECEIVE_SONGS, SHOW_MORE_SONGS} from '../constants/actionTypes';


function requestSongs() {
  return {
    type: REQUEST_SONGS
  };
}

function receiveSongs(data) {
  return {
    type: RECEIVE_SONGS,
    songData: data,
    receivedAt: Date.now()
  };
}

export const fetchSongs = () => (dispatch) =>  {
    dispatch(requestSongs());

    let url = 'https://sheetsu.com/apis/v1.0/26abdc6c39f1';
    fetch(url).then(r => r.json())
      .then(data => dispatch(receiveSongs(data)))
      .catch(e => console.error(e.toString()));
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
