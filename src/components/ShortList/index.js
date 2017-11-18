import React, {PropTypes} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Song from '../song/Song';
import * as actions from '../SongList/actions';
import _ from 'lodash';

class ShortList  extends React.Component {
  render() {
    const {shortlist, songs} = this.props;
    return(
      <section>
        {
          shortlist.map((songId) => {
            const song = _.find(songs, {id: songId});
            return(
              <Song key={song.id} song={song} />
            );
          })
        }
      </section>
    );
  }
}

const mapStateToProps = (state) => ({
  songs: state.songList.songData,
  shortlist: state.songList.shortlist,
});

const mapDispatchToProps = (dispatch) => bindActionCreators(actions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ShortList);
