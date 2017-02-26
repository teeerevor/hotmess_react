import React, {PropTypes} from 'react';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import * as actions from '../../actions/songListActions'
import * as styles from './IndexList.styl'

class IndexList  extends React.Component {
  constructor(props) {
    super(props);
    this.state = {active: "TOP"};
  }

  indexItems(){
    return ['TOP'].concat("ABCDEFGHIJKLMNOPQRSTUVW".split('')).concat('XYZ');
  }

  changeIndex(index){
    this.props.showSongAtIndex(index);
    this.setState({active: index});
  }

  render() {
    const active = this.state.active;
    return(
      <nav className={styles.indexList} >
      {this.indexItems().map((item) =>
        <button
          key={item}
          onClick={this.changeIndex.bind(this, item)}
          className={ active === item ? styles.active : styles.index }
        > {item}
        </button>
      )}
      </nav>
    );
  }
}

const mapStateToProps = () =>  {return {}}

const mapDispatchToProps = (dispatch) => bindActionCreators(actions, dispatch);

export default connect( mapStateToProps, mapDispatchToProps )(IndexList);
