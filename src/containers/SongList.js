import React, {PropTypes} from 'react';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import PubSub from 'pubsub-js';
import * as songListActions from '../actions/songListActions'
import InlineSvg from '../components/InlineSvg';
import Song from '../components/song/Song';



class SongList  extends React.Component {
  //getInitialState() {
    //console.log('init');
    //let sortBy = 'song';
    ////let filteredSongs = filter.filterSongs(this.props.songs, sortBy, this.props.index, this.props.index);
    //return {
      //sortBy:      sortBy,
      //startFilter: this.props.index,
      //endFilter:   this.props.index,
      //currentSong: {id: -1},
      //songData: this.props.songs,
      //songs: [],
      //shortlistedSongs: []
    //};
  //}

  componentWillMount() {
    this.props.songListActions.fetchSongs();
  }

  getSorterButtonLabel() {
    let sortBtnText = 'Sorted by ';
    return sortBtnText + this.state.sortBy;
  }

  //toggleSortOrder() {
    //let newSortBy, songData, filteredSongs;
    //if( this.state.sortBy == 'song' ) {
      //newSortBy =  'artist';
      //songData  = this.props.artistSongs;
    //} else {
      //newSortBy = 'song';
      //songData  = this.props.songs;
    //}

    //filteredSongs = filter.filterSongs(songData, newSortBy, 'top', 'top');
    //this.setState({
      //currentSong: {},
      //index:  'top',
      //sortBy: newSortBy,
      //songData: songData,
      //songs: filteredSongs
    //});
  //}

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
          There are no <b>{sortBy}s</b> starting with <b>'{this.state.startFilter.toUpperCase()}'</b> in this list.
        </p>

        <button data-startFilter="{this.state.startFilter}" onClick={this.showPrevAlphaIndex}>BACK UP!</button>
        <button data-startFilter="{this.state.startFilter}" onClick={this.showNextAlphaIndex}>GO FORTH!</button>
      </div>
    );
  }

            //let openSong = this.state.currentSong.id === song.id;
            //let shortlisted = this.state.shortlistedSongs.includes(song.id);
  renderSongList(songs, sortBy = 'artist') {
    return(
      <div className="scroller">
        <ul className="big-list list">
          {songs.map((song, i) => {
            let openSong = false;
            let shortlisted = false;
            return (<Song key={song.id}
                         song={song}
                         open={openSong}
                         shortlisted={shortlisted}
                         sortBy={sortBy}/>);
          })}
        </ul>
      </div>
    );
  }

  //render() {
    //let {songs} = this.props;
    //let songBlock;

    //if (songs && songs.length > 0) {
      //songBlock = this.renderSongList(songs);
    //} else {
      //songBlock = this.renderEmptyState();
    //}
    //return (
      //<div className="song-section">
        //<nav className="toggle-sort">
          //<a onClick={this.toggleSortOrder}>{this.getSorterButtonLabel()}</a>
        //</nav>
        ////<h3>{window.hotmess100.year} Song List</h3>
        //<h3>2016 Song List</h3>
        //{ songBlock }
      //</div>
    //);
  //}
  render() {
    let {songs, isFetching, sortBy} = this.props;
    let songBlock;

    if (isFetching) {
      songBlock = this.renderLoading();
    }else if (songs && songs.length == 0) {
      songBlock = this.renderEmptyState(sortBy);
    } else if (songs && songs.length > 0) {
      songBlock = this.renderSongList(songs);
    }

    return (
      <div className="song-section">
        <button onClick={this.props.songListActions.showMoreSongs}>show more</button>
        <nav className="toggle-sort">
        </nav>
        <h3>2016 Song List</h3>
        { songBlock }
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
  songs: PropTypes.array.isRequired
};

const mapStateToProps = (state) => ({
    songs: state.songList.songs,
    isFetching: state.songList.isFetching
});

const mapDispatchToProps = (dispatch) => ({
  songListActions: bindActionCreators(songListActions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(SongList);

