import React, {PropTypes} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../SongList/actions';
import styled, { css } from 'styled-components';
import { fromStyleMap } from '../../utils';

const bgColor= '#d3d3d3';
const fontColor= '#333';

const IndexNav = styled.nav`
  margin-top: 16px;
  display: flex;
  flex-direction: column;
  height: calc(100vh - 80px - 16px);
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
    background-color: ${bgColor};
    color: ${fontColor};
    cursor: pointer;
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0 5px;
    border-radius: 5px;
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
    margin-bottom: 1px;

    &:focus {
      outline: 0;
    }
  `,
  active: css`
    background-color: rgba(255, 99, 71, 0.8);
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
