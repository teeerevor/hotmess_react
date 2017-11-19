import React, {PropTypes} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../SongList/actions';
import styled, { css } from 'styled-components';
import { fromStyleMap } from '../../utils';

const IndexNav = styled.nav`
  position: fixed;
  left: -1px;
  top: 100px;
  display: flex;
  flex-direction: column;
  flex: 0 0 35px;
  min-height: 0px;
  height: calc(100vh - 100px);
  width: 40px;
`;

const IndexButtonMap = {
  default: css`
    border: solid 1px #ddd;
    background-color: white;
    position: relative;
    font-size: 0.8em;
    text-align: center;
    vertical-align: middle;
    text-decoration: none;
    background-color: $index_bg_color;
    color: $index_font_color;
    cursor: pointer;
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0 5px;
    border-top-right-radius: 5px;
    border-top-left-radius: 0;
    border-bottom-right-radius: 5px;
    border-bottom-left-radius: 0;
    margin-bottom: 1px;

    &:focus {
      outline: 0;
    }
  `,
  active: css`
    background-color: rgba(255, 99, 71, 0.4);
    border-color: #dcb5af;
    color: white;
  `
};

const IndexButton = styled.div`
  ${fromStyleMap(IndexButtonMap)};
`;

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
      <IndexNav>
        {this.indexItems().map((item) =>
          <IndexButton
            key={item}
            onClick={this.props.showSongAtIndex.bind(this, item)}
            active={activeIndex === item}
          >
            {item}
          </IndexButton>
        )}
      </IndexNav>
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
