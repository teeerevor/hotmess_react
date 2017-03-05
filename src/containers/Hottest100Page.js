import React, {PropTypes} from 'react';
import SongList from './SongList/index';
import IndexList from '../components/indexList/IndexList';

const Hottest100Page = (props) => {
  return (
    <div>
      <IndexList />
      <SongList />
    </div>
  );
};

export default Hottest100Page;
