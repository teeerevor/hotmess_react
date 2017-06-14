import React, {PropTypes} from 'react';

const IconPlay = ({className}) => {
  return (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" width="15.27" height="20" viewBox="0 0 15.27 20" aria-labelledby="title">
      <title id="title">Play Icon</title>
      <path d="M0.54,1.1A1.25,1.25,0,0,1,2.4.17,51,51,0,0,1,13.34,8.9a1.25,1.25,0,0,1,0,1.7A52.37,52.37,0,0,1,2.43,19.81a1.25,1.25,0,0,1-1.9-.92A74.72,74.72,0,0,1,.54,1.1Z"/>
    </svg>
  );
};

IconPlay.propTypes = {
  className: PropTypes.string,
};

export default IconPlay;
