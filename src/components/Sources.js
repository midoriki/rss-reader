import React from 'react';
import PropTypes from 'prop-types';

import { Select, Spin } from 'antd';

const { Option } = Select;

export default class Sources extends React.Component {
  changeSource(value) {
    const { selectSource, fetchArticles, selectArticle } = this.props;
    selectSource(value);
    fetchArticles(value);
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
    return (
      <div className="sources">
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
  fetchArticles: id => console.log(id),
  selectArticle: value => console.log(value),
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
};
