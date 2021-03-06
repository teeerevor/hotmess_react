import React, {PropTypes} from 'react';

const IconContinuous = ({className}) => {
  return (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" width="25.21" height="24.27" viewBox="0 0 25.21 24.27" aria-labelledby="title">
      <title id="title"> Icon</title>
      <path d="M23,11.58a2,2,0,0,0-2,2A3.42,3.42,0,0,1,17.58,17H7.15c0-.9-0.11-1.79-0.22-2.69a0.66,0.66,0,0,0-1-.49,26.85,26.85,0,0,0-5.76,4.6,0.66,0.66,0,0,0,0,.9,27.54,27.54,0,0,0,5.76,4.85,0.66,0.66,0,0,0,1-.48C7,22.8,7.1,21.9,7.15,21H17.58A7.43,7.43,0,0,0,25,13.58,2,2,0,0,0,23,11.58Z" />
      <path d="M25,5A27.53,27.53,0,0,0,19.28.1a0.66,0.66,0,0,0-1,.48Q18.13,1.79,18.07,3H7.42A7.43,7.43,0,0,0,0,10.42v0.42a2,2,0,0,0,4,0V10.42A3.42,3.42,0,0,1,7.42,7H18.05c0,1,.11,2,0.23,3a0.66,0.66,0,0,0,1,.49A26.85,26.85,0,0,0,25,5.85,0.66,0.66,0,0,0,25,5Z" />
    </svg>
  );
};

IconContinuous.propTypes = {
  className: PropTypes.string,
};

export default IconContinuous;
