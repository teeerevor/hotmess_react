import React, {PropTypes} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../../containers/SongList/actions';
import * as styles from './IndexList.styl';

class IndexList  extends React.Component {
  constructor(props) {
    super(props);
  }

  indexItems(){
    return ['TOP'].concat("ABCDEFGHIJKLMNOPQRSTUVW".split('')).concat('XYZ');
  }

  render() {
    const { activeIndex } = this.props;
    return(
      <nav className={styles.indexList} >
      {this.indexItems().map((item) =>
        <button
          key={item}
          onClick={this.props.showSongAtIndex.bind(this, item)}
          className={activeIndex === item ? styles.active : styles.index}
        > {item}
        </button>
      )}
      </nav>
    );
  }
}

IndexList.propTypes = {
  showSongAtIndex: PropTypes.func,
  activeIndex: PropTypes.string,
};

const mapStateToProps = (state) => ({
  activeIndex: state.songList.filterStart,
});

const mapDispatchToProps = (dispatch) => bindActionCreators(actions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(IndexList);
