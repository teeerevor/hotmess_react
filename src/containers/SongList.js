import React, {PropTypes} from 'react';
import PubSub from 'pubsub-js';
import SongListFilter from 'SongListFilter'

let filter = new SongListFilter();

export default class SongList  extends React.Component {
  getInitialState() {
    var sortBy = 'song',
        filteredSongs = filter.filterSongs(this.props.songs, sortBy, this.props.index, this.props.index);
    return {
      sortBy:      sortBy,
      startFilter: this.props.index,
      endFilter:   this.props.index,
      currentSong: {id: -1},
      songData: this.props.songs,
      songs: filteredSongs,
      shortlistedSongs: []
    };
  }

  render() {
    let songBlock;
    if (this.state.songs.length === 0) {
      songBlock = this.renderEmptyState();
    } else {
      songBlock = this.renderSongList();
    }
    return (
      <div className='song-section'>
        <nav className='toggle-sort'>
          <a onClick={this.toggleSortOrder}>{this.getSorterButtonLabel()}</a>
        </nav>
        <h3>{window.hotmess100.year} Song List</h3>
        { songBlock }
      </div>
    );
  }

  renderEmptyState() {
    return(
      <div className='emptyState'>
        <InlineSvg iconClass={'no-tunes'} iconName={'#no-tunes'} />
        <h4>
          WOAH! NO TUNES.
        </h4>
        <p>
          There are no <b>{this.state.sortBy}s</b> starting with <b>'{this.state.startFilter.toUpperCase()}'</b> in this list.
        </p>

        <button data-startFilter="{this.state.startFilter}" onClick={this.showPrevAlphaIndex}>BACK UP!</button>
        <button data-startFilter="{this.state.startFilter}" onClick={this.showNextAlphaIndex}>GO FORTH!</button>
      </div>
    );
  }

  renderSongList() {
    return(
      <div className='scroller'>
        <ul className='big-list list'>
          {this.state.songs.map((song, i) => {
            song.index = i;
            var openSong = this.state.currentSong.id === song.id,
                shortlisted = this.state.shortlistedSongs.includes(song.id)
            return <Song key={song.id}
                         song={song}
                         songList={this}
                         songIndex={i}
                         songListLength={this.state.songs.length}
                         open={openSong}
                         shortlisted={shortlisted}
                         sortBy={this.state.sortBy}/>;
          })}
        </ul>
      </div>
    );
  }


  componentWillMount() {
    var songList =  this;
    this.pubsubNext = PubSub.subscribe('playerNext', function(topic, currentSong) {
      songList.getNextSong(currentSong);
    }.bind(this));
    this.pubsubPrev = PubSub.subscribe('playerPrevious', function(topic, currentSong) {
      songList.getPreviousSong(currentSong);
    }.bind(this));
    this.pubsubRandom = PubSub.subscribe('playerRandom', function(topic) {
      songList.playRandomSong();
    }.bind(this));
    this.pubsubJumpToSong = PubSub.subscribe('jumpToSong', function(topic, song) {
      songList.jumpToSong(song);
    }.bind(this));
    this.pubsubShortlistUpdated = PubSub.subscribe('shortlistUpdated', function(topic, shortlist) {
      songList.setState({shortlistedSongs: shortlist});
    }.bind(this));
  }

  componentWillUnmount() {
    PubSub.unsubscribe(this.pubsubNext);
    PubSub.unsubscribe(this.pubsubPrev);
  }

  componentWillReceiveProps(nextProps) {
    var filteredSongs = filter.filterSongs(this.state.songData, this.state.sortBy, nextProps.index, nextProps.index);
    this.setState({
      currentSong: {},
      startFilter: nextProps.index,
      endFilter: nextProps.index,
      songs: filteredSongs
    });
  }

  getSorterButtonLabel() {
    var sortBtnText = 'Sorted by ';
    return sortBtnText + this.state.sortBy;
  }

  toggleSortOrder() {
    var newSortBy, songdata, filteredSongs;
    if( this.state.sortBy == 'song' ) {
      newSortBy =  'artist';
      songData  = this.props.artistSongs;
    } else {
      newSortBy = 'song';
      songData  = this.props.songs;
    }

    filteredSongs = filter.filterSongs(songData, newSortBy, 'top', 'top');
    this.setState({
      currentSong: {},
      index:  'top',
      sortBy: newSortBy,
      songData: songData,
      songs: filteredSongs
    });
  }

  showMore() {
    var newEnd       = filter.getNextLetter(this.state.endFilter),
        filteredSongs = filter.filterSongs(this.state.songData, this.state.sortBy, this.state.startFilter, newEnd);
    this.setState({
      endFilter: newEnd,
      songs: filteredSongs
    });
  }

  showPrevAlphaIndex() {
    var newStart     = filter.getPreviousLetter(this.state.startFilter),
        filteredSongs = filter.filterSongs(this.state.songData, this.state.sortBy, newStart, this.state.startFilter);
    this.setState({
      startFilter: newStart,
      songs: filterSongs
    });
  }

  showNextAlphaIndex() {
    var newEnd       = filter.getNextLetter(this.state.endFilter),
        filteredSongs = filter.filterSongs(this.state.songData, this.state.sortBy, this.state.startFilter, newEnd);
    this.setState({
      endFilter: newEnd,
      songs: filterSongs
    });
  }

  getNextSong(song) {
    var nextSong = this.state.songs[song.index + 1];
    PubSub.publish('updateCurrentSong', nextSong);
    this.setState({currentSong: nextSong});
  }

  getPreviousSong(song) {
    var nextSong = this.state.songs[song.index - 1];
    PubSub.publish('updateCurrentSong', nextSong);
    this.setState({currentSong: nextSong});
  }

  playRandomSong() {
    var songNumber = Math.round(Math.random() * this.state.songData.length),
        song = this.state.songData[songNumber],
        songFirstLetter = song.name.charAt(0),
        filterLetter = filter.checkLetter(songFirstLetter),
        filteredSongs = filter.filterSongs(this.state.songData, this.state.sortBy, songFirstLetter, songFirstLetter);

    this.setState({
      currentSong: song,
      endFilter: filterLetter,
      sortBy: 'song',
      startFilter: filterLetter,
      songs: filteredSongs
    });
  }

  jumpToSong(song) {
    var songFirstLetter = song.name.charAt(0),
        filterLetter = filter.checkLetter(songFirstLetter),
        filteredSongs = filter.filterSongs(this.state.songData, this.state.sortBy, songFirstLetter, songFirstLetter);

    this.setState({
      currentSong: song,
      endFilter: filterLetter,
      sortBy: 'song',
      startFilter: filterLetter,
      songs: filteredSongs
    });
  }
}

const renderWaypoint = () => {
  //adds a way point 3/4 down the song list
  var threeQuarterPoint = Math.floor(this.props.songListLength/4*3),
      SongTest          = threeQuarterPoint == this.props.songIndex;

  if(this.state.includeWaypoint && SongTest)
    return <Waypoint className='waypoint' onEnter={this.handleWaypointEnter} threshold={0.2} />
}

const handleWaypointEnter = () => {
  this.props.songList.showMore();
  this.setState({includeWaypoint: false})
}
