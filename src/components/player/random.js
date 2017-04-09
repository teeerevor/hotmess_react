import React from 'react';
import IconPlay from '../../components/svgs/IconPlay';
import styles from './random.styl';

const Random = ({onClick}) => {
  return(
    <div className={styles.box}>
      <button className={styles.random} onClick={onClick}>
        <IconPlay className={styles.iconPlay} />
      </button>
      <div className={styles.iFeelLucky}>
        PLAY A RANDOM
      </div>
    </div>
  );
};

Random.propTypes = {
  onClick: React.PropTypes.func.isRequired,
};

export default Random;