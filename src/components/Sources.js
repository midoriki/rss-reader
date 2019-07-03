import React from 'react';
import PropTypes from 'prop-types';

import {
  Select, Spin, Icon, Modal, Button, Input,
} from 'antd';

const { Option } = Select;

export default class Sources extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      name: '',
      url: '',
    };
  }

  componentDidUpdate(prevProps) {
    const { sources } = this.props;
    const prevSources = prevProps.sources.items;

    const diffSource = sources.items.find(item => prevSources.indexOf(item) < 0);
    if (diffSource) {
      this.changeSource(diffSource.id);
    }
  }

  showModal() {
    this.setState({
      visible: true,
      name: '',
      url: '',
    });
  }

  handleCancel() {
    this.setState({
      visible: false,
    });
  }

  handleSubmit() {
    const { name, url } = this.state;
    const { addSource } = this.props;
    addSource(name, url);
    this.setState({
      visible: false,
    });
  }

  handleEnterName(e) {
    const name = e.target.value;
    this.setState({
      name,
    });
  }

  handleEnterUrl(e) {
    const url = e.target.value;
    this.setState({
      url,
    });
  }

  changeSource(value) {
    const {
      selectSource, fetchArticles, selectArticle, sources,
    } = this.props;
    selectSource(value);
    fetchArticles(sources.items.find(item => item.id === value));
    // reset current article
    selectArticle(-1);
  }

  renderSources() {
    const { sources } = this.props;
    if (sources.items.length <= 0) {
      return '';
    }
    return sources.items.map(s => <Option key={s.id} value={s.id}>{s.name}</Option>);
  }

  render() {
    const { selectedSource, sources } = this.props;
    const { visible, name, url } = this.state;
    return (
      <div className="sources">
        <Icon type="plus-circle" title="Add source" id="add-source" onClick={() => this.showModal()} />
        {sources.isFetching
          ? (
            <div className="centered" style={{ paddingTop: 20 }}>
              <Spin />
            </div>
          )
          : (
            <Select
              placeholder="Select a Source"
              style={{ width: 250 }}
              onChange={value => this.changeSource(value)}
              value={selectedSource}
            >
              <Option value={0} disabled>Select a Source</Option>
              { this.renderSources() }
            </Select>
          )
        }
        <Modal
          title="Add source"
          visible={visible}
          onCancel={() => this.handleCancel(0)}
          footer={[
            <Button key="back" onClick={() => this.handleCancel()}>
              Cancel
            </Button>,
            <Button key="submit" type="primary" onClick={() => this.handleSubmit()}>
              Submit
            </Button>,
          ]}
        >
          <div className="input-container">
            <Input placeholder="Source name" value={name} onChange={e => this.handleEnterName(e)} />
            <Input placeholder="RSS URL" value={url} onChange={e => this.handleEnterUrl(e)} />
          </div>
        </Modal>
      </div>
    );
  }
}

Sources.defaultProps = {
  sources: {
    isFetching: true,
    items: [],
  },
  selectedSource: -1,
  selectSource: value => console.log(value),
  fetchArticles: source => console.log(source),
  selectArticle: value => console.log(value),
  addSource: (name, url) => console.log(name, url),
};

Sources.propTypes = {
  sources: PropTypes.shape({
    isFetching: PropTypes.bool,
    items: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
      url: PropTypes.string,
    })),
  }),
  selectedSource: PropTypes.number,
  selectSource: PropTypes.func,
  fetchArticles: PropTypes.func,
  selectArticle: PropTypes.func,
  addSource: PropTypes.func,
};
