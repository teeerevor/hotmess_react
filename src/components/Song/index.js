import React, {PropTypes} from 'react';
import styled, {css} from 'styled-components';
//import { ScrollElement } from 'react-scroll';

import { fromStyleMap } from '../../utils';
import SongAudio          from '../SongAudio';
import IconPlus           from '../svgs/IconPlus';
import IconUparrow        from '../svgs/IconUparrow';
import IconPlay           from '../svgs/IconPlay';
import IconTick           from '../svgs/IconTick';

import btns               from '../../styles/buttons.styl';

const darkGrey = '#dcdcdc';
const lightGrey = '#eee';
//$song-padding-hoz= 8px
//$song-padding-vert= 15px
//$song-border-radius= 5px
//$song-bottom-margin= 3px

const iconDefaults = css`
    width: 14px;
    height: 14px;
    position: absolute;
    transition: transform ease-out 200ms;
    top: 12px;
`;
const PlayIcon = styled(IconPlay)`
  ${iconDefaults}
  fill: white;
  right: -20px;
`;
const SelectedIcon = styled(IconTick)`
  ${iconDefaults}
  right: 10px;
  fill: rgba(199,235,95,1);
  display: none;
`;
const Tag = styled.div`
  overflow: hidden;
  cursor: pointer;
  border-radius: 5px;
  background-color: ${lightGrey};
  flex: 1;
  padding: 10px 15px;
  position: relative;
`;

const SongItemMap = {
  default: css`
    display: flex;
    list-style: none;
    margin-bottom: 3px;

    &:hover {
      ${Tag} {
        background-color: ${darkGrey};
      }

      button {
        svg {
          color: tomato;
        }
      }

      ${PlayIcon} {
        transform: translateX(-30px)
      }
    }

    button {
      outline: none
    }
  `,
  open: css`
    ${PlayIcon} {
      opacity: 0
    }
    ${Tag} {
      padding-bottom: 15px
    }
  `,
  shortlisted: css`
    &:hover {
      ${Tag} {
        background-color: rgba(199, 235, 95, 0.6);
      }
    }
    ${Tag} {
      background-color: rgba(199, 235, 95, 0.4);
    }
    ${SelectedIcon} {
      display: inline
    }
    ${PlayIcon} {
      opacity: 0
    }
    button {
      opacity: 0
    }
  `,
};

const SongItem = styled.li`
  ${fromStyleMap(SongItemMap)};
`;


const Song = ({
  song,
  sortBy,
  shortlisted,
  isOpen,
  onToggleSongView,
  onShortlistTop,
  onShortlist,
}) => {
  let title = song.artist;
  let additional = song.name;
  if(sortBy === 'song'){
    title = song.name;
    additional = song.artist;
  }

  return (
    <SongItem
      name={'song'+song.id}
      data-id={song.id}
      open={isOpen}
      shortlisted={shortlisted}
    >
      <Tag onClick={onToggleSongView}>
        <span>
          <b>{title}</b> - {additional}
        </span>
        {isOpen &&
          <SongAudio song={song} />
        }
        <PlayIcon />
        <SelectedIcon />
      </Tag>
      <button className={btns.circleButton} onClick={onShortlistTop} > <IconUparrow /> </button>
      <button className={btns.circleButton} onClick={onShortlist} > <IconPlus /> </button>
    </SongItem>
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
