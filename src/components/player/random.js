import React from 'react';
import IconPlay from '../../components/svgs/IconPlay';
import styles from './random.styl';

const Random = ({onClick}) => {
  return(
    <div className={styles.box}>
      <div className={styles.left}>
        <button className={styles.random} onClick={onClick}>
          <IconPlay className={styles.iconPlay} />
          <div className={styles.iFeelLucky}>
            PLAY A RANDOM
          </div>
        </button>
      </div>
      <div className={styles.right}> &nbsp;</div>
    </div>
  );
};

Random.propTypes = {
  onClick: React.PropTypes.func.isRequired,
};

export default Random;
