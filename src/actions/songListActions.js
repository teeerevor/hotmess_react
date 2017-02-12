//import * as types from '../constants/actionTypes';

export const REQUEST_SONGS = 'REQUEST_SONGS';
export const RECEIVE_SONGS = 'RECEIVE_SONGS';

function requestSongs() {
  return {
    type: REQUEST_SONGS
  }
}

function receiveSongs(json) {
  return {
    type: RECEIVE_SONGS,
    songs: json,
    receivedAt: Date.now()
  }
}

export function fetchSongs(subreddit) {
  return dispatch => {
    dispatch(requestSongs());

    let url = 'https://sheetsu.com/apis/v1.0/26abdc6c39f1';
    fetch(url).then(r => r.json())
      .then(data => dispatch(receiveSongs(data)))
      .catch(e => console.log("Booo"))
  }
}
