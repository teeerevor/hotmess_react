import React      from 'react';
import classNames from 'classnames'
import InlineSvg  from './InlineSvg';
import SongAudio  from './SongAudio';
import PubSub     from 'pubsub-js';

class Song extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: props.open,
      shortlisted: props.shortlisted
    };
  }

  render() {
    const {open, shortlisted} = this.state;
    const {song, sortBy} = this.props;

    var classes = classNames({
      'song': true,
      'open': open,
      'shortlisted': shortlisted
    });
    return (
      <li className={classes} data-id={this.props.song.id}>
        <div className='song-display' onClick={this.toggleDisplay}>
          {this.arrangeSongInfo(song, sortBy)}
          {this.renderAudio(song, open)}
          <InlineSvg iconClass={'hover-play'} iconName={'#play'} />
          <InlineSvg iconClass={'icon-selected'} iconName={'#tick'} />
        </div>
        <button className='circle-button top' onClick={this.shortlistTop} > <InlineSvg iconClass={'icon-top'} iconName={'#arrow-circ'} /> </button>
        <button className='circle-button add' onClick={this.shortlistAdd} > <InlineSvg iconClass={'icon-plus'} iconName={'#plus-circ'} /> </button>
      </li>
    );
  }

  componentWillReceiveProps(nextProps) {
    this.setState({open: nextProps.open});
  }

  renderAudio = (song, open=false) => {
    if( open )
      return <SongAudio song={song} />
  }

  toggleDisplay = () => {
    this.state.open ? this.setState({open: false}) : this.setState({open: true})
  }

  arrangeSongInfo = (song, sortBy = 'song') => {
    if(sortBy == 'song')
      return (<span className="text">
                <b>
                  {song.name}
                </b>
                &nbsp;-&nbsp;
                {song.artistName}
              </span>);
    else
      return (<span className="text">
                <b>{song.artistName}</b>
                &nbsp;-&nbsp;
               {song.name}</span>);
  }

  shortlistAdd = () => {
    this.setState({shortlisted: true})
    PubSub.publish( 'addSong', this.props.song);
  }

  shortlistTop = () => {
    this.setState({shortlisted: true})
    PubSub.publish( 'topSong', this.props.song);
  }
}

export default Song






