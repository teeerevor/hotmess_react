import React, {PropTypes} from 'react';

export default class YoutubeTrack extends React.Component {
  componentDidMount() {
    const videoId = this.props.song.youtube_key;
    const divId = this.ytDivId();
    this.player = new YT.Player(divId, {  // eslint-disable-line
      videoId: videoId,
      playerVars: { 'autoplay': 1},
      events: {
        'onStateChange': this.onPlayerStateChange
      }
    });
  }

  componentWillUnmount() {
    this.player.destroy();
  }

  onPlayerStateChange = (e) => {
    /*eslint-disable */
    //BUFFERING: 3 CUED: 5 ENDED: 0 PAUSED: 2 PLAYING: 1 UNSTARTED: -1
    switch (e.data) {
      case YT.PlayerState.PLAYING:
        this.props.onPlay();
        break;
      case YT.PlayerState.PAUSED:
        this.props.onPause();
        break;
      case YT.PlayerState.ENDED:
        this.props.onEnd();
        break;
    }
    /*eslint-enable */
  }

  ytDivId = () =>
    'yt-video-'+this.props.song.youtube_key;

  componentWillReceiveProps = (nextProps) => {
    if ( nextProps.playing !== this.props.playing ){
      nextProps.playing ?
        this.player.playVideo()
        :
        this.player.pauseVideo();
    }
  }

  render = () =>
    <div id={this.ytDivId()} />
}

YoutubeTrack.propTypes = {
  song: PropTypes.object.isRequired,
  onPlayPause: PropTypes.func,
  onEnd: PropTypes.func,
  playing: PropTypes.bool,
};
