import React from 'react';
import ControlPanel from './ControlPanel';
import {
  MODE_SINGLE,
  MODE_CONTINUOUS,
  MODE_RANDOM,
  MODE_REPEAT,
} from '../../containers/player/types.js';
import styles from './player.styl';

const Player = ({
      song,
      playing,
      onPlayPause,
      onPrev,
      onNext,
      mode,
      onModeChange,
}) => {
  return(
    <div className={styles.playerDisplay}>
      <div className={styles.currentSong}>
        <span className={styles.song}>{ song.name }</span>
        <span className={styles.artist}>{ song.artist }</span>
      </div>
      <ControlPanel
        playing={playing}
        mode={mode}
        onPlayPause={onPlayPause}
        onNext={onNext}
        onPrev={onPrev}
        onModeChange={onModeChange}
      />
    </div>
  );
}

export default Player;
