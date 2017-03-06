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

  //showPrevAlphaIndex() {
    //let newStart      = filter.getPreviousLetter(this.state.startFilter);
    //let filteredSongs = filter.filterSongs(this.state.songData, this.state.sortBy, newStart, this.state.startFilter);
    //this.setState({
      //startFilter: newStart,
      //songs: filteredSongs
    //});
  //}

  //showNextAlphaIndex() {
    //let newEnd        = filter.getNextLetter(this.state.endFilter);
    //let filteredSongs = filter.filterSongs(this.state.songData, this.state.sortBy, this.state.startFilter, newEnd);
    //this.setState({
      //endFilter: newEnd,
      //songs: filteredSongs
    //});
  //}

  //getNextSong(song) {
    //let nextSong = this.state.songs[song.index + 1];
    //PubSub.publish('updateCurrentSong', nextSong);
    //this.setState({currentSong: nextSong});
  //}

  //getPreviousSong(song) {
    //let nextSong = this.state.songs[song.index - 1];
    //PubSub.publish('updateCurrentSong', nextSong);
    //this.setState({currentSong: nextSong});
  //}

  //playRandomSong() {
    //let songNumber = Math.round(Math.random() * this.state.songData.length),
        //song = this.state.songData[songNumber],
        //songFirstLetter = song.name.charAt(0),
        //filterLetter = filter.checkLetter(songFirstLetter),
        //filteredSongs = filter.filterSongs(this.state.songData, this.state.sortBy, songFirstLetter, songFirstLetter);

    //this.setState({
      //currentSong: song,
      //endFilter: filterLetter,
      //sortBy: 'song',
      //startFilter: filterLetter,
      //songs: filteredSongs
    //});
  //}

  //jumpToSong(song) {
    //let songFirstLetter = song.name.charAt(0),
        //filterLetter = filter.checkLetter(songFirstLetter),
        //filteredSongs = filter.filterSongs(this.state.songData, this.state.sortBy, songFirstLetter, songFirstLetter);

    //this.setState({
      //currentSong: song,
      //endFilter: filterLetter,
      //sortBy: 'song',
      //startFilter: filterLetter,
      //songs: filteredSongs
    //});
  //}


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

        <button onClick={this.showPrevAlphaIndex}>BACK UP!</button>
        <button onClick={this.showNextAlphaIndex}>GO FORTH!</button>
      </div>
    );
  }

            //let shortlisted = this.state.shortlistedSongs.includes(song.id);
                          //onShortlist={this.onShortlist}
                          //onShortlistTop={this.onShortlistTop}
  renderSongList(songs, sortBy, openSongs) {
    return(
      <div className="scroller">
        <ul className="big-list list">
          {songs.map((song, i) => {
            let shortlisted = false;
            let open = _.indexOf(openSongs, song.id) !== -1;
            return (
              <Song key={song.id}
                    song={song}
                    isOpen={open}
                    shortlisted={shortlisted}
                    sortBy={sortBy}
                    onToggleSongView={this.props.toggleSongView.bind(
                                      this,
                                      song.id,
                                      )}
              />
            );
          })}
        </ul>
      </div>
    );
  }

      //<h3>{window.hotmess100.year} Song List</h3>
  render() {
    let {songs, isFetching, sortBy, openSongs} = this.props;
    let songBlock;

    if (isFetching) {
      songBlock = this.renderLoading();
    }else if (songs && songs.length == 0) {
      songBlock = this.renderEmptyState(sortBy);
    } else if (songs && songs.length > 0) {
      songBlock = this.renderSongList(songs, sortBy, openSongs);
    }

    let sortLabel = sortBy === 'song' ? "Sorted by SONGS" : "Sorted by ARTISTS";
    return (
      <div className="song-section">
        <button onClick={this.props.showMoreSongs}>show more</button>
        <nav className="toggle-sort">
          <a onClick={this.props.toggleSortOrder}>{sortLabel}</a>
        </nav>
        <h3>2016 Song List</h3>
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
  filterStart: PropTypes.bool,
  filterEnd: PropTypes.bool,
  sortBy: PropTypes.bool,
  openSongs: PropTypes.array,
  fetchSongsIfRequired: PropTypes.func,
  toggleSongView: PropTypes.func,
  toggleSortOrder: PropTypes.func,
  showMoreSongs: PropTypes.func,
};

const mapStateToProps = (state) => ({
    songs: state.songList.songs,
    isFetching: state.songList.isFetching,
    filterStart: state.songList.filterStart,
    filterEnd: state.songList.filterEnd,
    sortBy: state.songList.sortBy,
    openSongs: state.songList.openSongs,
});

const mapDispatchToProps = (dispatch) => bindActionCreators(actions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(SongList);

