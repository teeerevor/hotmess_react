import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from './actions';

import IconPlay from '../../components/svgs/IconPlay';
import IconPause from '../../components/svgs/IconPause';
import IconBack from '../../components/svgs/IconBack';
import IconForward from '../../components/svgs/IconForward';
import IconContinuous from '../../components/svgs/IconContinuous';
import IconSingle from '../../components/svgs/IconSingle';
import IconRandom from '../../components/svgs/IconRandom';

import styles from './styles.styl';
import {
  MODE_SINGLE,
  MODE_CONTINUOUS,
  MODE_RANDOM,
  MODE_REPEAT,
} from './types.js';

class Player  extends React.Component {
  renderRandom() {
    return(
      <div className={styles.playerRandom}>
        <button className={styles.random} onClick={this.props.playRandom}>
          <IconPlay className={styles.iconPlay} />
        </button>
        <div className={styles.iFeelLucky}>
          Fuck it play something
        </div>
      </div>
    );
  }

  renderButtons() {
    const { playing } = this.props;
    return(
      <div className={styles.playerButtons}>
        <button className={styles.backButton} onClick={this.props.playPrevSong}>
          <IconBack />
        </button>

        <button
          className={styles.circleButton}
          onClick={this.props.toggelPlay}
        >
          <IconPlay className={styles.iconPlay} />
          <IconPause className={styles.iconPlay} />
        </button>

        <button className={styles.fwdButton} onClick={this.props.playNextSong}>
          <IconForward />
        </button>

        <button className={styles.mode} onClick={this.props.toggleMode}>
          <IconContinuous />
          <IconSingle />
          <IconRandom />
        </button>
      </div>
    );
  }

  renderPlayer() {
    const { song = {} } = this.props;
    return(
      <div className={styles.playerDisplay}>
        <div className={styles.currentSong}>
          <b>{ song.name }</b>
          { song.artist }
        </div>
        {this.renderButtons()}
      </div>
    );
  }

  render() {
    const section = this.props.currentSong == [] ?  this.renderRandom : this.renderPlayer;
    return (
      <div className={styles.player}>
        {this.renderRandom()}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  song: state.songList.currentSong,
  playing: state.player.playing,
  mode: state.player.mode,
});

const mapDispatchToProps = (dispatch) => bindActionCreators(actions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Player);
