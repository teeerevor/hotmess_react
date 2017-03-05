import React, {PropTypes} from 'react';

export default class IconPlus extends React.Component {
  render() {
    return (
      <svg className={this.props.className} xmlns="http://www.w3.org/2000/svg" width="20" height="17.01" viewBox="0 0 21.71 17.01" aria-labelledby="title">
        <title id="title">Tick Icon</title>
        <path d="M6.92,16.36a2.22,2.22,0,0,0,3.14,0l11-11a2.22,2.22,0,0,0,0-3.14L19.49.65a2.22,2.22,0,0,0-3.14,0L8.51,8.49,5.36,5.35a2.22,2.22,0,0,0-3.14,0L.65,6.92a2.22,2.22,0,0,0,0,3.14Z"/>
      </svg>
    );
  }
}

IconPlus.propTypes = {
  className: PropTypes.string,
};
