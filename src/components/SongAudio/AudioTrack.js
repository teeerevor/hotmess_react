import React, {PropTypes} from 'react';
import PubSub from 'pubsub-js';

export default class AudioTrack extends React.Component {
  componentWillMount() {
    let that = this;
    this.pubsubPlay = PubSub.subscribe('playerPlay', function(topic, song) { // eslint-disable-line
      that.track().play();
    }.bind(this));
    this.pubsubPause = PubSub.subscribe('playerPause', function(topic) { // eslint-disable-line
      that.track().pause();
    }.bind(this));
  }

  componentDidMount() {
    let that = this;
    if(that.track()){
      //pause all corrent playing
      PubSub.publish( 'playerPause');
      setTimeout(function(){
        that.track().play();
      }, 500);
      PubSub.publish( 'songPlay', this.props.song);
    }
  }

  componentWillUnmount() {
    PubSub.unsubscribe(this.pubsubPlay);
    PubSub.unsubscribe(this.pubsubPause);
  }

  playing() {
    PubSub.publish( 'songPlay', this.props.song);
  }

  paused() {
    PubSub.publish( 'songPause', this.props.song);
  }

  ended() {
    PubSub.publish( 'songEnded', this.props.song);
  }

  play() {
    this.track().play();
  }

  pause() {
    this.track().pause();
  }

  songId() {
    return 'song-' + this.props.song.id;
  }

  track() {
    return document.getElementById(this.songId());
  }

  render() {
    return(
        <audio id={this.songId()}
              src={this.props.song.jjj_preview}
              className="jjj-audio"
              controls="false"
              onPlaying={this.playing}
              onPlay={this.playing}
              onPause={this.paused}
              onEnded={this.ended} >
        <p>Your browser does not support the <code>audio</code> element </p>
        </audio>
    );
  }
}

AudioTrack.propTypes = {
  song: PropTypes.object.isRequired
};
