import React, {PropTypes} from 'react';
import IconPlus           from '../svgs/IconPlus';
import IconUparrow        from '../svgs/IconUparrow';
import IconPlay           from '../svgs/IconPlay';
import IconTick           from '../svgs/IconTick';
import SongAudio          from '../song_audio/SongAudio';
import PubSub             from 'pubsub-js';
import styles             from './Song.styl';
import btns               from '../../styles/buttons.styl';

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

    let className = styles.song;
    if (open) className = styles.open;
    if (shortlisted) className = styles.shortlisted;
    if (open && shortlisted) className = styles.openAndShortlisted;

    return (
      <li className={className} data-id={this.props.song.id}>
        <div className={styles.tag} onClick={this.toggleDisplay}>
          {this.arrangeSongInfo(song, sortBy)}
          {this.renderAudio(song, open)}
          <IconPlay className={styles.iconPlay} />
          <IconTick className={styles.iconSelected} />
        </div>
        <button className={btns.circleButton} onClick={this.shortlistTop} > <IconUparrow /> </button>
        <button className={btns.circleButton} onClick={this.shortlistAdd} > <IconPlus /> </button>
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
