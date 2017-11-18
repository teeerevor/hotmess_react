import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from './actions';
import Random from './Random';
import Player from './Player.js';
import styles from './styles.styl';

export const DEFAULT = 'DEFAULT';
export const CONTINUOUS = 'CONTINUOUS';
export const REPEAT = 'REPEAT';
export const RANDOM = 'RANDOM';


class PlayerContainer  extends React.Component {
  render() {
    const {song, playing, mode} = this.props;
    const {
      toggleMode,
      togglePlay,
      playNextSong,
      playPrevSong,
      playRandomSong,
    } = this.props;
    const showRandom = song.id === undefined;
    return (
      <div className={styles.player}>
        {
          showRandom ?
            <Random onClick={playRandomSong}/>
            :
            <Player
              song={song}
              playing={playing}
              onPlayPause={togglePlay}
              mode={mode}
              onNext={playNextSong}
              onPrev={playPrevSong}
              onModeChange={toggleMode}
            />
        }
      </div>
    );
  }
}

PlayerContainer.propTypes = {
  song: PropTypes.object,
  playing: PropTypes.bool,
  mode: PropTypes.string,
  toggleMode: PropTypes.func,
  togglePlay: PropTypes.func,
  playNextSong: PropTypes.func,
  playPrevSong: PropTypes.func,
  playRandomSong: PropTypes.func,
};

const mapStateToProps = (state) => ({
  song: state.songList.currentSong,
  playing: state.player.playing,
  mode: state.player.mode,
});

const mapDispatchToProps = (dispatch) => bindActionCreators(actions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(PlayerContainer);
