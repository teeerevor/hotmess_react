import React, {PropTypes} from 'react';

const IconCross = ({className}) => {
  return (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 35 35" aria-labelledby="title">
      <title id="title">Cross</title>
      <circle fill="currentColor" cx="17.5" cy="17.5" r="17.5"/>
      <path d="M348.1,167.231a1.251,1.251,0,0,0,0-1.773l-4.433-4.433,4.433-4.435a1.251,1.251,0,0,0,0-1.773l-1.773-1.773a1.255,1.255,0,0,0-1.773,0l-4.433,4.433-4.435-4.433a1.255,1.255,0,0,0-1.773,0l-1.773,1.773a1.251,1.251,0,0,0,0,1.773l4.433,4.435-4.433,4.433a1.251,1.251,0,0,0,0,1.773L333.914,169a1.255,1.255,0,0,0,1.773,0l4.435-4.433L344.556,169a1.255,1.255,0,0,0,1.773,0Z" transform="translate(-322.621 -143.524)"></path>
    </svg>
  );
};

IconCross.propTypes = {
  className: PropTypes.string,
};

export default IconCross;
