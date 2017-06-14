import React, {PropTypes} from 'react';
import cx from 'classnames';
import styles from './styles.styl';

const IconForward = ({className}) => {
  const classes = cx(styles.forward, className);
  return (
    <svg className={classes} xmlns="http://www.w3.org/2000/svg" width="20" height="13.15" viewBox="0 0 20 13.15" aria-labelledby="title">
      <title id="title"> Icon Next</title>
      <path d="M1.58,0.11A0.82,0.82,0,0,0,.35.72a49.13,49.13,0,0,0,0,11.71,0.82,0.82,0,0,0,1.25.6A34.43,34.43,0,0,0,8.79,7a0.82,0.82,0,0,0,0-1.12A33.5,33.5,0,0,0,1.58.11Z"/>
      <path d="M19.77,5.85A33.53,33.53,0,0,0,12.58.11a0.82,0.82,0,0,0-1.23.61,49.13,49.13,0,0,0,0,11.71,0.82,0.82,0,0,0,1.25.6A34.43,34.43,0,0,0,19.79,7,0.82,0.82,0,0,0,19.77,5.85Z"/>
    </svg>
  );
};

IconForward.propTypes = {
  className: PropTypes.string,
};

export default IconForward;

