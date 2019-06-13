import React from 'react';
import PropTypes from 'prop-types';
import { List, Spin } from 'antd';
import timeUtils from '../utils/time';

export default class ArticleList extends React.Component {
  handleClickArticle(item) {
    const { selectArticle, fetchXFrameOption, selectedSource } = this.props;
    selectArticle(item.id);
    if (typeof item.allowed === 'undefined') {
      fetchXFrameOption(selectedSource, item.id, item.link);
    }
  }

  render() {
    const { articles, selectedArticle } = this.props;
    return (
      <div className="article-list">
        {(Object.keys(articles).length <= 0 || articles.isFetching)
          ? (
            <div className="centered" style={{ paddingTop: 30 }}>
              <Spin />
            </div>
          )
          : (
            <List
              itemLayout="horizontal"
              dataSource={articles.items}
              renderItem={(item, index) => (
                <List.Item
                  style={{ paddingLeft: 10 }}
                  onClick={() => this.handleClickArticle(item)}
                  className={`rss-feed${
                    (index === selectedArticle) ? ' active' : ''}`}
                >
                  <List.Item.Meta
                    title={item.title}
                    description={(typeof item.isoDate === 'undefined')
                      ? timeUtils.toLocaleDateTime(item.pubDate)
                      : timeUtils.toLocaleDateTime(item.isoDate)
                    }
                  />
                </List.Item>
              )}
            />
          )
        }
      </div>
    );
  }
}

ArticleList.defaultProps = {
  articles: {
    isFetching: true,
    items: [],
  },
  selectArticle: value => console.log(value),
  selectedArticle: -1,
  selectedSource: -1,
  fetchXFrameOption: (sourceId, articleId, url) => console.log(url),
};

ArticleList.propTypes = {
  articles: PropTypes.shape({
    isFetching: PropTypes.bool,
    lastUpdated: PropTypes.number,
    items: PropTypes.arrayOf(PropTypes.shape({
      title: PropTypes.string,
      pubDate: PropTypes.string,
    })),
  }),
  selectArticle: PropTypes.func,
  selectedArticle: PropTypes.number,
  fetchXFrameOption: PropTypes.func,
  selectedSource: PropTypes.number,
};
