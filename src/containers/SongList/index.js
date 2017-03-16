import React, {PropTypes} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from './actions';
import InlineSvg from '../../components/InlineSvg';
import Song from '../../components/song/Song';
import _ from 'lodash';

class SongList  extends React.Component {
  componentWillMount() {
    this.props.fetchSongsIfRequired();
  }

  renderLoading() {
    return(
      <div className="emptyState">
        <h4>
          WOAH THERE!
        </h4>
        <p>
          We're still loading...
        </p>
      </div>
    );
  }

  renderEmptyState(sortBy) {
    return(
      <div className="emptyState">
        <InlineSvg iconClass={'no-tunes'} iconName={'#no-tunes'} />
        <h4>
          WOAH! NO TUNES.
        </h4>
        <p>
          There are no <b>{sortBy}s</b> starting with <b>{this.props.filterStart.toUpperCase()}</b> in this list.
        </p>

        <button onClick={this.props.showPrevListIndex}>BACK UP!</button>
        <button onClick={this.props.showNextListIndex}>GO FORTH!</button>
      </div>
    );
  }

  renderSongList() {
    let {songs, sortBy, openSongs, shortlist} = this.props;
    return(
      <div className="scroller">
        <ul className="big-list list">
          {songs.map((song, i) => {
            let open        = _.includes(openSongs, song.id);
            let shortlisted = _.includes(shortlist, song.id);
            return (
              <Song key={song.id}
                    song={song}
                    isOpen={open}
                    shortlisted={shortlisted}
                    sortBy={sortBy}
                    onToggleSongView={this.props.toggleSongView.bind(
                                      this,
                                      song.id,
                                      song,
                                      )}
                    onShortlistTop={this.props.shortlistSongTop.bind(
                                      this,
                                      song.id,
                                      song,
                                      )}
                    onShortlist={this.props.shortlistSong.bind(
                                      this,
                                      song.id,
                                      song,
                                      )}
              />
            );
          })}
        </ul>
      </div>
    );
  }

  render() {
    let {songs, sortBy, year, isFetching} = this.props;
    let songBlock;

    if (isFetching) {
      songBlock = this.renderLoading();
    }else if (songs && songs.length == 0) {
      songBlock = this.renderEmptyState(sortBy);
    } else if (songs && songs.length > 0) {
      songBlock = this.renderSongList();
    }

    let sortLabel = sortBy === 'song' ? "Sorted by SONGS" : "Sorted by ARTISTS";
    return (
      <div className="song-section">
        <button onClick={this.props.showMoreSongs}>show more</button>
        <nav className="toggle-sort">
          <a onClick={this.props.toggleSortOrder}>{sortLabel}</a>
        </nav>
        <h3>{year} Song List</h3>
        {songBlock}
      </div>
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
  sortBy: PropTypes.string,
  fetchSongsIfRequired: PropTypes.func,
  toggleSongView: PropTypes.func,
  openSongs: PropTypes.array,
  toggleSortOrder: PropTypes.func,
  showMoreSongs: PropTypes.func,
  shortlistSongTop: PropTypes.func,
  shortlistSong: PropTypes.func,
  shortlist: PropTypes.array,
};

const mapStateToProps = (state) => ({
  songs: state.songList.songs,
  isFetching: state.songList.isFetching,
  sortBy: state.songList.sortBy,
  openSongs: state.songList.openSongs,
  shortlist: state.songList.shortlist,
});

const mapDispatchToProps = (dispatch) => bindActionCreators(actions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(SongList);

