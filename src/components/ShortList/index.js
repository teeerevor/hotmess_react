import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import styled from 'styled-components';
import find from 'lodash/find';

import * as actions from '../SongList/actions';
import ShortListItem from './ShortListItem';

const List = styled.section`
  padding-top: 16px;
`;

const Heading = styled.h3`
  margin-top: 0;
  margin-bottom: 16px;
`;

const PickPlaceholder = styled.li`
  border-bottom: 2px #dddddd dashed;
  color: #999;
  font-weight: bold;
  letter-spacing: 0.5px;
  list-style-type: none;
  margin-bottom: 3px;
  margin-right: 90px;
  padding: 13px 15px;
`;


class ShortList  extends React.Component {
  render() {
    const {shortlist, songs} = this.props;
    return(
      <List>
        <Heading>YOUR SHORTLIST</Heading>
        {
          shortlist.map((songId) => {
            const song = find(songs, {id: songId});
            return(
              <ShortListItem
                key={song.id}
                song={song}
                onMoveToTop={
                  this.props.moveSongToTop.bind(
                    this,
                    song.id,
                )}
                onRemove={
                  this.props.delistSong.bind(
                    this,
                    song.id,
                )}
                onScrollToSong={null}
              />
            );
          })
        }
        {
          [...Array(10).keys()].map(pick =>
            pick >= shortlist.length ?
              <PickPlaceholder key={pick + 1} > PICK {pick + 1} </PickPlaceholder>
              :
              null
          )
        }
      </List>
    );
  }
}


ShortList.propTypes = {
  shortlist: PropTypes.array,
  songs: PropTypes.array,
  delistSong: PropTypes.func,
  moveSongToTop: PropTypes.func,
};

const mapStateToProps = (state) => ({
  shortlist: state.songList.shortlist,
  songs: state.songList.songData,
});

const mapDispatchToProps = (dispatch) => bindActionCreators(actions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ShortList);
