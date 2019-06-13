import React from 'react';
import PropTypes from 'prop-types';
import { Skeleton, Spin } from 'antd';

export default class Article extends React.Component {
  renderArticle() {
    const { article } = this.props;
    if (!article) {
      return <Skeleton paragraph={{ rows: 10 }} />;
    }
    if (article.isFetching || typeof article.allowed === 'undefined') {
      return <Spin />;
    }
    if (!article.allowed) {
      return (
        <div className="article">
          <div>
            <p>
              Article can not be embedded, click the link to open new tab&nbsp;
              <a href={article.link || 'error'} target="_blank" rel="noopener noreferrer">Link</a>
            </p>
          </div>
          <div>
            <p>This is the content of RSS feed</p>
            <div className="article" dangerouslySetInnerHTML={{ __html: article.content || 'error' }} />
          </div>
        </div>
      );
    }
    return <iframe title={article.title || 'error'} src={article.link || 'error'} />;
  }

  render() {
    return (
      <div style={{ padding: 24, background: '#fff', textAlign: 'center' }}>
        { this.renderArticle() }
      </div>
    );
  }
}

Article.defaultProps = {
  article: null,
};

Article.propTypes = {
  article: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    link: PropTypes.string,
    content: PropTypes.string,
    allowed: PropTypes.bool,
  }),
};
