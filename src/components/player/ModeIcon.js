import React, {PropTypes} from 'react';
import IconContinuous from '../svgs/IconContinuous';
import IconSingle from '../svgs/IconSingle';
import IconRandom from '../svgs/IconRandom';

import {
  REPEAT,
  RANDOM,
} from './index';

const ModeIcon = ({mode}) => {
  switch(mode) {
    case REPEAT:
      return <IconSingle />;
    case RANDOM:
      return <IconRandom />;
    default:
      return <IconContinuous />;
  }
};

ModeIcon.propTypes = {
  mode: PropTypes.string,
};

export default ModeIcon;
