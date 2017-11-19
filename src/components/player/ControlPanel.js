import React, {PropTypes} from 'react';
import IconPlay from '../svgs/IconPlay';
import IconPause from '../svgs/IconPause';
import IconBack from '../svgs/IconBack';
import IconForward from '../svgs/IconForward';
import ModeIcon from './ModeIcon';

import styles from './control_panel.styl';

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
          <IconPause />
          :
          <IconPlay  className={styles.play}/>
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
};

ControlPanel.propTypes = {
  playing: PropTypes.bool,
  mode: PropTypes.string,
  onModeChange: PropTypes.func,
  onPlayPause: PropTypes.func,
  onPrev: PropTypes.func,
  onNext: PropTypes.func,
};

export default ControlPanel;
