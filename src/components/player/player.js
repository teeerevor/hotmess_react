import React, {PropTypes} from 'react';
import ControlPanel from './ControlPanel';
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
};

Player.propTypes = {
  song: PropTypes.object,
  playing: PropTypes.bool,
  mode: PropTypes.string,
  onModeChange: PropTypes.func,
  onPlayPause: PropTypes.func,
  onPrev: PropTypes.func,
  onNext: PropTypes.func,
};

export default Player;
