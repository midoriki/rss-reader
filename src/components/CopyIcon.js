import React from 'react';
import PropTypes from 'prop-types';
import { Icon, Tooltip } from 'antd';
import utils from '../utils/utils';

export default class CopyIcon extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: 'Copy source',
    };
  }

  handleClickCopy(text) {
    utils.copyToClipboard(text).then(() => {
      this.setState({
        title: 'Copied to clipboard',
      });
    }, () => {
      this.setState({
        title: 'Failed to copy! Please try again!',
      });
    });
  }

  handleMouseOut() {
    setTimeout(() => {
      this.setState({
        title: 'Copy source',
      });
    }, 500);
  }

  render() {
    const { text } = this.props;
    const { title } = this.state;
    return (
      <Tooltip title={title}>
        <Icon
          onClick={() => this.handleClickCopy(text)}
          onMouseOut={() => this.handleMouseOut()}
          onBlur={() => this.handleMouseOut()}
          type="copy"
        />
      </Tooltip>
    );
  }
}

CopyIcon.defaultProps = {
  text: '',
};

CopyIcon.propTypes = {
  text: PropTypes.string,
};
