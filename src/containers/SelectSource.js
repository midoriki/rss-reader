import { connect } from 'react-redux';
import { selectSource, fetchArticles, selectArticle } from '../actions/rss';
import Sources from '../components/Sources';

const mapStateToProps = state => ({
  sources: state.sources,
  selectedSource: state.selectedSource,
});

const mapDispatchToProps = dispatch => ({
  selectSource: value => dispatch(selectSource(value)),
  fetchArticles: id => dispatch(fetchArticles(id)),
  selectArticle: id => dispatch(selectArticle(id)),
});

const SelectSource = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Sources);

export default SelectSource;
