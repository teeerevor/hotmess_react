import React, {PropTypes} from 'react';

export default class InlineSvg extends React.Component {
  render() {
    const iconName = this.props.iconName;
    const useTag = '<use xlink:href="'+iconName+'"></use>';

    return (
      <svg className={this.props.iconClass} preserveAspectRatio="xMinYMin meet" dangerouslySetInnerHTML={{__html: useTag }} /> // eslint-disable-line
    );
  }
}

InlineSvg.propTypes = {
  iconName: PropTypes.string.isRequired,
  iconClass: PropTypes.string.isRequired
};
