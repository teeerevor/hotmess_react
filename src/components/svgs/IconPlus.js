import React, {PropTypes} from 'react';
import cx from 'classnames';

const IconPlus = ({className}) => {
  const classes = cx("plus", className);
  return (
    <svg className={classes} xmlns="http://www.w3.org/2000/svg" width="35" height="35" viewBox="0 0 35 35" aria-labelledby="title">
      <title id="title">Umbrella Icon</title>
      <circle fill="currentColor" cx="17.5" cy="17.5" r="17.5"/>
      <path d="M289.077,157.363h-4.444v-4.444a2.221,2.221,0,0,0-2.222-2.222h-2.222a2.221,2.221,0,0,0-2.222,2.222v4.444h-4.444a2.221,2.221,0,0,0-2.222,2.222v2.222a2.221,2.221,0,0,0,2.222,2.222h4.444v4.444a2.222,2.222,0,0,0,2.222,2.222h2.222a2.222,2.222,0,0,0,2.222-2.222v-4.444h4.444a2.221,2.221,0,0,0,2.222-2.222v-2.222A2.221,2.221,0,0,0,289.077,157.363Z" transform="translate(-263.8 -143.196)" />
    </svg>
  );
};

IconPlus.propTypes = {
  className: PropTypes.string,
};

export default IconPlus;
