import React, {PropTypes} from 'react';
import styled from 'styled-components';

import IconUparrow        from '../svgs/IconUparrow';
import IconCross        from '../svgs/IconCross';
import CircleButton       from '../CircleButton';

const lightGrey = '#eee';
const darkGrey = '#dcdcdc';

const Tag = styled.div`
  overflow: hidden;
  cursor: pointer;
  border-radius: 5px;
  background-color: ${lightGrey};
  flex: 1;
  padding: 10px 15px;
  position: relative;
`;

const ListItem = styled.li`
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
`;

const ShortListItem = ({
  song,
  onMoveToTop,
  onRemove,
  onScrollToSong,
}) =>
  <ListItem>
    <Tag onClick={onScrollToSong}>
      <span>
        <b>{song.name}</b> - {song.artist}
      </span>
    </Tag>
    <CircleButton onClick={onMoveToTop} >
      <IconUparrow title="Move to top" />
    </CircleButton>
    <CircleButton onClick={onRemove} > <IconCross alt="Remove song" /> </CircleButton>
  </ListItem>;

ShortListItem.propTypes = {
  song: PropTypes.object,
  onMoveToTop: PropTypes.func,
  onRemove: PropTypes.func,
  onScrollToSong: PropTypes.func,
};

export default ShortListItem;
