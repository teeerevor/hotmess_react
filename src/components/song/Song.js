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
  componentWillReceiveProps(nextProps) {
    this.setState({open: nextProps.open});
  }

  renderAudio = (song, open) => {
    if( open )
      return (<div className={styles.songAudio}><SongAudio song={song} /></div>);
  }

  arrangeSongInfo(song, sortBy) {
    if(sortBy === 'song')
      return (<span className={styles.text}>
                <b>
                  {song.name}
                </b>
                &nbsp;-&nbsp;
                {song.artist}
              </span>);
    else
      return (<span className={styles.text}>
                <b>{song.artist}</b>
                &nbsp;-&nbsp;
               {song.name}</span>);
  }

  render() {
    const {song, sortBy, shortlisted, isOpen} = this.props;

    let className = styles.song;
    if (isOpen) className = styles.open;
    if (shortlisted) className = styles.shortlisted;
    if (isOpen && shortlisted) className = styles.openAndShortlisted;

    return (
      <li className={className} data-id={this.props.song.id}>
        <div className={styles.tag} onClick={() => this.props.onToggleSongView()}>
          {this.arrangeSongInfo(song, sortBy)}
          {this.renderAudio(song, isOpen)}
          <IconPlay className={styles.iconPlay} />
          <IconTick className={styles.iconSelected} />
        </div>
        <button className={btns.circleButton} onClick={() => this.props.onShortlistTop()} > <IconUparrow /> </button>
        <button className={btns.circleButton} onClick={() => this.props.onShortlist()} > <IconPlus /> </button>
      </li>
    );
  }
}

Song.propTypes = {
  song: PropTypes.object.isRequired,
  sortBy: PropTypes.string,
  isOpen: PropTypes.bool,
  shortlisted: PropTypes.bool,
  onToggleSongView: PropTypes.func,
};

export default Song;
