import { connect } from 'react-redux';
import { fetchSources } from '../actions/rss';
import Home from '../components/Home';

const mapDispatchToProps = dispatch => ({
  loadSource: dispatch(fetchSources()),
});

const DisplayHome = connect(
  null,
  mapDispatchToProps,
)(Home);

export default DisplayHome;
