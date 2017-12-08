import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import styled from 'styled-components';
import find from 'lodash/find';

import Song from '../Song';
import * as actions from '../SongList/actions';

const List = styled.section`
  padding-top: 16px;
`;

const Heading = styled.h3`
  margin-top: 0;
  margin-bottom: 16px;
`;

const PickPlaceholder = styled.li`
  list-style-type: none;
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
              <Song key={song.id} song={song} />
            );
          })
        }
        {
          [...Array(10).keys()].map(pick =>
            pick >= shortlist.length ?
              <PickPlaceholder key={pick + 1} > Pick {pick + 1} </PickPlaceholder>
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
};

const mapStateToProps = (state) => ({
  shortlist: state.songList.shortlist,
  songs: state.songList.songData,
});

const mapDispatchToProps = (dispatch) => bindActionCreators(actions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ShortList);
