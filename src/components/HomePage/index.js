import { connect } from 'react-redux';
import HomePage from './HomePage';
import { fetchTestData } from '../../reducers/actions';

function mapStateToProps({ test }) {
  return {
    isFetching: test.isFetching,
    error: test.error,
    data: test.data,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    fetchTestData: () => dispatch(fetchTestData()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
