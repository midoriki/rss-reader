import { connect } from 'react-redux';
import {
  selectSource, fetchArticles, selectArticle, addSource,
} from '../actions/rss';
import Sources from '../components/Sources';

const mapStateToProps = state => ({
  sources: state.sources,
  selectedSource: state.selectedSource,
});

const mapDispatchToProps = dispatch => ({
  selectSource: value => dispatch(selectSource(value)),
  fetchArticles: source => dispatch(fetchArticles(source)),
  selectArticle: id => dispatch(selectArticle(id)),
  addSource: (name, url) => dispatch(addSource(name, url)),
});

const SelectSource = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Sources);

export default SelectSource;
