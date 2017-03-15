import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from './actions';

class Player  extends React.Component {
  render() {
    return (
      <div>
        <button onClick={this.props.playRandomSong}>Play random</button>
        <button onClick={this.props.playNextSong}>Next</button>
        <button onClick={this.props.playPrevSong}>Previous</button>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => bindActionCreators(actions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Player);
