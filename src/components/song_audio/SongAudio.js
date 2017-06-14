import React, {PropTypes} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../../containers/player/actions';
import AudioTrack from './AudioTrack';
import YoutubeTrack from './YoutubeTrack';

class SongAudio extends React.Component {
  hasAudio(song){
    if(song.youtube_key) return "youtube";
    if(song.soundclound_key) return "soundclound";
    return "JJJ";
  }

  render() {
    const {song, playingSong, playing} = this.props;
    const {playSong, pauseSong, songEnded} = this.props;
    const imPlaying = song.id === playingSong.id && playing;

    switch (this.hasAudio(song)) {
      case "youtube":
        return (
          <YoutubeTrack
            className="song-audio"
            song={song}
            playing={imPlaying}
            onPlay={playSong}
            onPause={pauseSong}
            onEnd={songEnded}
          />
        );
      case "soundclound":
        return( <div /> );
      default:
        return( <AudioTrack className="song-audio" song={this.props.song} /> );
    }
  }
}

SongAudio.propTypes = {
  song: PropTypes.object.isRequired,
  playingSong: PropTypes.object,
  playing: PropTypes.bool,
  playSong: PropTypes.func,
  pauseSong: PropTypes.func,
  songEnded: PropTypes.func,
};

const mapStateToProps = (state) => ({
  songs: state.songList.songs,
  isFetching: state.songList.isFetching,
  sortBy: state.songList.sortBy,
  openSongs: state.songList.openSongs,
  shortlist: state.songList.shortlist,
  playingSong: state.songList.currentSong,
  playing: state.player.playing,
});

const mapDispatchToProps = (dispatch) => bindActionCreators(actions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(SongAudio);

