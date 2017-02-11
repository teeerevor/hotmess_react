import React, {PropTypes} from 'react';
import AudioTrack from './AudioTrack';
import YoutubeTrack from './YoutubeTrack';

class SongAudio extends React.Component {
  hasAudio(song){
    if(song.youtube_url) return "youtube";
    if(song.soundclound_url) return "soundclound";
    return "JJJ";
  }

  render() {
    switch (this.hasAudio(this.props.song)) {
      case "youtube":
        return( <YoutubeTrack className="song-audo" song={this.props.song} /> );
      case "soundclound":
        return( <div /> );
      default:
        return( <AudioTrack className="song-audio" song={this.props.song} /> );
    }
  }
}

SongAudio.propTypes = {
  song: PropTypes.object.isRequired
};

export default SongAudio;
