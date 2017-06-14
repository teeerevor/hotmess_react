import React, {PropTypes} from 'react';
import cx from 'classnames';
import styles from './styles.styl';

const IconPause = ({className}) => {
  const classes = cx(styles.pause, className);

  return (
    <svg className={classes} xmlns="http://www.w3.org/2000/svg" width="13" height="17" viewBox="0 0 13 17" aria-labelledby="title">
      <title id="title">Pause Icon</title>
      <rect height="17" rx="1" ry="1" width="5" />
      <rect height="17" rx="1" ry="1" width="5" x="8" />
    </svg>
  );
};

IconPause.propTypes = {
  className: PropTypes.string,
};

export default IconPause;
