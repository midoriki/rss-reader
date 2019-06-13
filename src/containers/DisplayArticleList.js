import { connect } from 'react-redux';
import { selectArticle, fetchXFrameCheck } from '../actions/rss';
import ArticleList from '../components/ArticleList';

function getArticlesFromSource(state) {
  const { selectedSource, articlesBySource } = state;
  if (typeof articlesBySource[selectedSource] !== 'undefined') {
    return articlesBySource[selectedSource];
  }
  return {
    isFetching: false,
    items: [],
  };
}

const mapStateToProps = state => ({
  selectedArticle: state.selectedArticle,
  articles: getArticlesFromSource(state),
  selectedSource: state.selectedSource,
});

const mapDispatchToProps = dispatch => ({
  selectArticle: value => dispatch(selectArticle(value)),
  fetchXFrameOption: (sourceId, articleId, url) => dispatch(
    fetchXFrameCheck(sourceId, articleId, url),
  ),
});

const DisplayArticleList = connect(
  mapStateToProps,
  mapDispatchToProps,
)(ArticleList);

export default DisplayArticleList;
