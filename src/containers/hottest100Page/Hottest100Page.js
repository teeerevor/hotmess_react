import React from 'react';
import Logo from '../../components/svgs/Logo';
import SongList from '../SongList/index';
import PlayerContainer from '../player/Player';
import IndexList from '../../components/indexList/IndexList';
import styles from './styles.styl';

const Hottest100Page = (props) => {
  return (
    <div>
      <div className={styles.header}>
        <div className={styles.logoContainer}>
          <Logo className={styles.logo}/>
        </div>
        <PlayerContainer />
      </div>
      <IndexList />
      <SongList year={props.params.year}/>
    </div>
  );
};

export default Hottest100Page;

