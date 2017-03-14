import React from 'react';
import SongList from './SongList/index';
import Player from './player/Player';
import IndexList from '../components/indexList/IndexList';

const Hottest100Page = (props) => {
  return (
    <div>
      <Player />
      <IndexList />
      <SongList />
    </div>
  );
};

export default Hottest100Page;
