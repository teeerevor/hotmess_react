import React, {PropTypes} from 'react';
import FlexiFrame from './FlexiFrame';
import PubSub   from 'pubsub-js';

export default class YoutubeTrack extends React.Component {
  componentWillMount() {
    let thisPlayer = this;
    /* eslint-disable */
    this.pubsubPlay = PubSub.subscribe('playerPlay', function(topic, song) {
      thisPlayer.play(song);
    }.bind(this));
    this.pubsubPause = PubSub.subscribe('playerPause', function(topic) {
      thisPlayer.pause();
    }.bind(this));
    /* eslint-enable */
  }

  componentDidMount() {
    let videoId = this.props.song.youtube_url;
    let divId = this.ytDivId();
    this.player = new YT.Player(divId, {  // eslint-disable-line
      videoId: videoId,
      playerVars: { 'autoplay': 1},
      events: {
        'onStateChange': this.onPlayerStateChange
      }
    });

    PubSub.publish( 'playerPause');
    //$('.song-audio').fitVids()
  }

  componentWillUnmount() {
    PubSub.unsubscribe(this.pubsubPlay);
    PubSub.unsubscribe(this.pubsubPause);
    this.player.destroy();
  }

  onPlayerStateChange(e){
    /*eslint-disable */
    //BUFFERING: 3 CUED: 5 ENDED: 0 PAUSED: 2 PLAYING: 1 UNSTARTED: -1
    switch (e.data) {
      case YT.PlayerState.PLAYING:
        PubSub.publish( 'songPlay', this.props.song);
        break;
      case YT.PlayerState.PAUSED:
        PubSub.publish( 'songPause', this.props.song);
        break;
      case YT.PlayerState.ENDED:
        PubSub.publish( 'songEnded', this.props.song);
        break;
    }
    /*eslint-enable */
  }

  play(song) {
    if(this.props.song.id === song.id)
      this.player.playVideo();
    else
      this.player.pauseVideo();
  }

  pause() {
    if(this.player.pauseVideo){
      this.player.pauseVideo();
    }
  }

  ytDivId() {
    return 'yt-video-'+this.props.song.youtube_url;
  }

  render(){
    let ytId = this.ytDivId();
    return(
      <FlexiFrame ratio={1.5} >
        <div id={ytId} /> );
      </FlexiFrame>
    );
  }
}

YoutubeTrack.propTypes = {
  song: PropTypes.object.isRequired
};
