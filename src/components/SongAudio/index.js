import React, {PropTypes} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import styled from 'styled-components';

import * as actions from '../player/actions';
import AudioTrack from './AudioTrack';
import YoutubeTrack from './YoutubeTrack';

const Audio = styled.div`
  height: 0;
  padding-bottom: 56.25%;
  margin-top: 15px;
  position: relative;
  width: 100%;

  iframe {
    height: 100%;
    left: 0;
    position: absolute;
    top: 0;
    width: 100%;
  }
`;

const hasAudio = (song) => {
    if(song.youtube_key) return "youtube";
    if(song.soundclound_key) return "soundclound";
    return "JJJ";
};

const SongAudio = ({
  song,
  playingSong,
  playing,
  playSong,
  pauseSong,
  songEnded,
}) => {
  const imPlaying = song.id === playingSong.id && playing;

  return (
    <Audio>
      { hasAudio(song) === "youtube" &&
        <YoutubeTrack
          className="song-audio"
          song={song}
          playing={imPlaying}
          onPlay={playSong}
          onPause={pauseSong}
          onEnd={songEnded}
        />
      }
      { hasAudio(song) === "soundclound" &&
        <div />
      }
      { hasAudio(song) === "JJJ" &&
        <AudioTrack className="song-audio" song={song} />
      }
    </Audio>
  );
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

