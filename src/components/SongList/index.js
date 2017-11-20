import React, {PropTypes} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Scroll from 'react-scroll';
import * as actions from './actions';
import Song from '../song/Song';
import Loading from './Loading';
import Empty from './Empty';
import _ from 'lodash';
import styled from 'styled-components';

const Heading = styled.h3`
  margin-top: 0;
  margin-bottom: 16px;
`;

const List = styled.div`
  position: relative;
  ul {
    padding: 0;
  }
`;

const ToggleListSort = styled.div`
  position: absolute;
  right: 0;

  a {
    cursor: pointer;
  }
`;

const Scroller = styled.div`
  overflow: hidden;
  position: relative;
  height: calc(100vh - 80px - 16px);
  ul {
    overflow-y: scroll;
  }
`;

class SongList  extends React.Component {
  componentWillMount() {
    this.props.fetchSongsIfRequired();
  }

  componentWillReceiveProps(newProps) {
    const {currentSong} = newProps;
    const playingNewSong = this.props.currentSong.id === currentSong.id;
    if( playingNewSong ){
      Scroll.scroller.scrollTo('song'+currentSong.id, {
        duration: 1500,
        delay: 100,
        smooth: true,
      });
    }
  }

  render() {
    const {
      songs,
      sortBy,
      openSongs,
      shortlist,
      filterStart,
      year,
      isFetching
    } = this.props;

    const sortLabel = sortBy === 'song' ? "Sorted by SONGS" : "Sorted by ARTISTS";
    return (
      <List>
        <ToggleListSort>
          <a onClick={this.props.toggleSortOrder}>{sortLabel}</a>
        </ToggleListSort>
        <Heading>{year} SONG LIST</Heading>
        { !!isFetching &&
          <Loading />
        }
        { !!songs && songs.length == 0 &&
          <Empty
            next={this.props.showPrevListIndex}
            prev={this.props.showNextListIndex}
            sortBy={sortBy}
            filterStart={filterStart}
          />
        }
        { !!songs && songs.length > 0 &&
          <Scroller>
            <ul>
              {songs.map((song) => {
                const open        = _.includes(openSongs, song.id);
                const shortlisted = _.includes(shortlist, song.id);

                return (
                  <Song key={song.id}
                        song={song}
                        isOpen={open}
                        shortlisted={shortlisted}
                        sortBy={sortBy}
                        onToggleSongView={
                          this.props.toggleSongView.bind(
                            this,
                            song.id,
                            song,
                        )}
                        onShortlistTop={
                          this.props.shortlistSongTop.bind(
                          this,
                          song.id,
                          song,
                        )}
                        onShortlist={
                          this.props.shortlistSong.bind(
                          this,
                          song.id,
                          song,
                        )}
                  />
                );
              })}
            </ul>
          </Scroller>
        }
      </List>
    );
  }
}

//const renderWaypoint = () => {
  ////adds a way point 3/4 down the song list
  //let threeQuarterPoint = Math.floor(this.props.songListLength/4*3);
  //let SongTest          = threeQuarterPoint == this.props.songIndex;

  //if(this.state.includeWaypoint && SongTest)
    //return (<Waypoint
              //className="waypoint"
              //onEnter={this.handleWaypointEnter}
              //threshold={0.2} />);
//};

//const handleWaypointEnter = () => {
  //this.props.songList.showMore();
  //this.setState({includeWaypoint: false});
//};

SongList.propTypes = {
  songs: PropTypes.array,
  isFetching: PropTypes.bool,
  filterStart: PropTypes.string,
  filterEnd: PropTypes.string,
  year: PropTypes.string,
  sortBy: PropTypes.string,
  fetchSongsIfRequired: PropTypes.func,
  toggleSongView: PropTypes.func,
  openSongs: PropTypes.array,
  toggleSortOrder: PropTypes.func,
  showMoreSongs: PropTypes.func,
  shortlistSongTop: PropTypes.func,
  shortlistSong: PropTypes.func,
  showPrevListIndex: PropTypes.func,
  showNextListIndex: PropTypes.func,
  shortlist: PropTypes.array,
  currentSong: PropTypes.object,
};

const mapStateToProps = (state) => ({
  songs: state.songList.songs,
  isFetching: state.songList.isFetching,
  sortBy: state.songList.sortBy,
  openSongs: state.songList.openSongs,
  shortlist: state.songList.shortlist,
  currentSong: state.songList.currentSong,
  playing: state.player.playing,
});

const mapDispatchToProps = (dispatch) => bindActionCreators(actions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(SongList);
