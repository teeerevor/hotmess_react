import React, {PropTypes} from 'react';
import classNames from 'classnames';
import InlineSvg  from './InlineSvg';
import SongAudio  from './SongAudio';
import PubSub     from 'pubsub-js';

class Song extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: props.open || false,
      shortlisted: props.shortlisted || false,
      sortBy: props.sortBy || 'song'
    };
  }


  componentWillReceiveProps(nextProps) {
    this.setState({open: nextProps.open});
  }

  renderAudio = (song, open) => {
    if( open )
      return <SongAudio song={song} />;
  }

  toggleDisplay = () => {
    this.state.open ? this.setState({open: false}) : this.setState({open: true});
  }

  arrangeSongInfo(song, sortBy) {
    if(sortBy === 'song')
      return (<span className="text">
                <b>
                  {song.name}
                </b>
                &nbsp;-&nbsp;
                {song.artist}
              </span>);
    else
      return (<span className="text">
                <b>{song.artistName}</b>
                &nbsp;-&nbsp;
               {song.name}</span>);
  }

  shortlistAdd = () => {
    this.setState({shortlisted: true});
    PubSub.publish( 'addSong', this.props.song);
  }

  shortlistTop = () => {
    this.setState({shortlisted: true});
    PubSub.publish( 'topSong', this.props.song);
  }

  render() {
    const {open, shortlisted} = this.state;
    const {song, sortBy} = this.props;

    let classes = classNames({
      song: true,
      open,
      shortlisted,
    });
    return (
      <li className={classes} data-id={this.props.song.id}>
        <div className="song-display" onClick={this.toggleDisplay}>
          {this.arrangeSongInfo(song, sortBy)}
          {this.renderAudio(song, open)}
          <InlineSvg iconClass={'hover-play'} iconName={'#play'} />
          <InlineSvg iconClass={'icon-selected'} iconName={'#tick'} />
        </div>
        <button className="circle-button top" onClick={this.shortlistTop} > <InlineSvg iconClass={'icon-top'} iconName={'#arrow-circ'} /> </button>
        <button className="circle-button add" onClick={this.shortlistAdd} > <InlineSvg iconClass={'icon-plus'} iconName={'#plus-circ'} /> </button>
      </li>
    );
  }
}

Song.propTypes = {
  song: PropTypes.object.isRequired,
  sortBy: PropTypes.string,
  open: PropTypes.bool,
  shortlisted: PropTypes.bool,
};

export default Song;
