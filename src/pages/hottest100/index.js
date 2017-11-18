import React, { PropTypes } from 'react';
import Logo from '../../components/svgs/Logo';
import SongList from '../../components/SongList';
import ShortList from '../../components/ShortList';
import Player from '../../components/player';
import IndexList from '../../components/indexList/IndexList';
import styles from './styles.styl';

const Hottest100Page = ({params}) => {
  return (
    <div>
      <div className={styles.header}>
        <div className={styles.logoContainer}>
          <Logo className={styles.logo}/>
        </div>
        <Player />
      </div>
      <IndexList />
      <SongList year={params.year}/>
      <ShortList />
    </div>
  );
};

Hottest100Page.propTypes = {
  params: PropTypes.object,
};

export default Hottest100Page;

