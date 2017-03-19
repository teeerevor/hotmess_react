import React, {PropTypes} from 'react';
import cx from 'classnames';
import styles from './styles.styl';

export const IconBack = ({className}) => {
  const classes = cx(styles.back);
  //const classes = cx(styles.pause, this.props.className);
  return (
    <svg className={classes} xmlns="http://www.w3.org/2000/svg" width="20" height="13.16" viewBox="0 0 20 13.16" aria-labelledby="title">
      <title id="title"> Icon</title>
      <path d="M19.65,0.72a0.82,0.82,0,0,0-1.25-.6,34.44,34.44,0,0,0-7.19,6.06,0.82,0.82,0,0,0,0,1.12A33.61,33.61,0,0,0,18.42,13a0.82,0.82,0,0,0,1.23-.61A49.14,49.14,0,0,0,19.65.72Z" />
      <path d="M8.19,0.08a0.82,0.82,0,0,0-.79,0A34.42,34.42,0,0,0,.21,6.18a0.82,0.82,0,0,0,0,1.12A33.58,33.58,0,0,0,7.42,13a0.82,0.82,0,0,0,1.23-.61A49.14,49.14,0,0,0,8.65.72,0.82,0.82,0,0,0,8.19.08Z" />
    </svg>
  );
}

IconBack.propTypes = {
  className: PropTypes.string,
};

