import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Page from '../Page';

export default function HomePage({
  isFetching,
  error,
  data,
  fetchTestData,
}) {
  useEffect(() => {
    if (!isFetching && !error && (!data || !data.length)) {
      fetchTestData();
    }
  }, [isFetching, error, data]);

  return (
    <Page>
      <h1>Welcome Home!</h1>
      <Link to="/hello">Say Hello</Link>
      <br />
      <br />
      {isFetching && (
        <label>Fetching data with redux...</label>
      )}
      {!!error && (
        <label className="error">Error fetching data</label>
      )}
      {data && data.length > 0 && (
        <React.Fragment>
          <h3>Data fetched with Redux</h3>
          <ul>
            {data.map(item => <li key={item}>{item}</li>)}
          </ul>
        </React.Fragment>
      )}
    </Page>
  );
}

HomePage.propTypes = {
  isFetching: PropTypes.bool,
  error: PropTypes.string,
  data: PropTypes.arrayOf(PropTypes.string),
  fetchTestData: PropTypes.func,
};

HomePage.defaultProps = {
  isFetching: false,
  error: undefined,
  data: undefined,
  fetchTestData: () => {},
};
