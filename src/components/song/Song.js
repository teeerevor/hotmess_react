import React, {PropTypes} from 'react';
//import { ScrollElement } from 'react-scroll';

import SongAudio          from '../SongAudio';
import IconPlus           from '../svgs/IconPlus';
import IconUparrow        from '../svgs/IconUparrow';
import IconPlay           from '../svgs/IconPlay';
import IconTick           from '../svgs/IconTick';

import styles             from './Song.styl';
import btns               from '../../styles/buttons.styl';

const Song = ({
  song,
  sortBy,
  shortlisted,
  isOpen,
  onToggleSongView,
  onShortlistTop,
  onShortlist,
}) => {
  let className = styles.song;
  if (isOpen) className = styles.open;
  if (shortlisted) className = styles.shortlisted;
  if (isOpen && shortlisted) className = styles.openAndShortlisted;

  let title = song.artist;
  let additional = song.name;
  if(sortBy === 'song'){
    title = song.name;
    additional = song.artist;
  }

  return (
    <li className={className} name={'song'+song.id} data-id={song.id}>
      <div className={styles.tag} onClick={onToggleSongView}>
        <span className={styles.text}>
          <b>{title}</b> - {additional}
        </span>
        {isOpen &&
            <div className={styles.songAudio}>
              <SongAudio song={song} />
            </div>
        }
        <IconPlay className={styles.iconPlay} />
        <IconTick className={styles.iconSelected} />
      </div>
      <button className={btns.circleButton} onClick={onShortlistTop} > <IconUparrow /> </button>
      <button className={btns.circleButton} onClick={onShortlist} > <IconPlus /> </button>
    </li>
  );
};

Song.propTypes = {
  song: PropTypes.object,
  sortBy: PropTypes.string,
  isOpen: PropTypes.bool,
  shortlisted: PropTypes.bool,
  onToggleSongView: PropTypes.func,
  onShortlistTop: PropTypes.func,
  onShortlist: PropTypes.func,
};

export default Song;
//export default ScrollElement(Song);
