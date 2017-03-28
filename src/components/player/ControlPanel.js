import React from 'react';
import {
  DEFAULT,
  CONTINUOUS,
  REPEAT,
  RANDOM,
} from '../../containers/player/Player'
import IconPlay from '../svgs/IconPlay';
import IconPause from '../svgs/IconPause';
import IconBack from '../svgs/IconBack';
import IconForward from '../svgs/IconForward';
import IconContinuous from '../svgs/IconContinuous';
import IconSingle from '../svgs/IconSingle';
import IconRandom from '../svgs/IconRandom';

import styles from './control_panel.styl';

const ModeIcon = ({mode}) => {
  switch(mode) {
    case REPEAT:
      return <IconSingle />
    case RANDOM:
      return <IconRandom />
    default:
      return <IconContinuous />
  }
}

const ControlPanel = ({
  playing,
  onPlayPause,
  mode,
  onModeChange,
  onPrev,
  onNext,
}) => {
  return(
    <div className={styles.controlPanel}>
      <button
        className={styles.buttonSmall}
        onClick={onPrev}
      >
        <IconBack />
      </button>

      <button
        className={styles.buttonBig}
        onClick={onPlayPause}
      >
        { playing ?
          <IconPlay  className={styles.play}/>
          :
          <IconPause />
        }
      </button>
      <button
        className={styles.buttonSmall}
        onClick={onNext}
      >
        <IconForward />
      </button>
      <button
        className={styles.buttonMode}
        onClick={onModeChange}
      >
        <ModeIcon mode={mode}/>
      </button>

    </div>
  );
}

export default ControlPanel;
