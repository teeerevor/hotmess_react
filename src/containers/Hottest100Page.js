import React from 'react';
import SongList from './SongList/index';
import PlayerContainer from './player/Player';
import IndexList from '../components/indexList/IndexList';

const Hottest100Page = (props) => {
  return (
    <div>
      <PlayerContainer />
      <IndexList />
      <SongList year={props.params.year}/>
    </div>
  );
};

export default Hottest100Page;
