import { connect } from 'react-redux';
import { fetchXFrameCheck } from '../actions/rss';
import Article from '../components/Article';

function getSelectedArticle(state) {
  const { selectedSource, selectedArticle, articlesBySource } = state;
  try {
    return articlesBySource[selectedSource].items[selectedArticle];
  } catch (e) {
    return null;
  }
}

const mapStateToProps = state => ({
  article: getSelectedArticle(state),
  sourceId: state.selectedSource,
});

const mapDispatchToProps = dispatch => ({
  checkXFrameOption: (sourceId, articleId, url) => dispatch(
    fetchXFrameCheck(sourceId, articleId, url),
  ),
});

const DisplayArticle = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Article);

export default DisplayArticle;
