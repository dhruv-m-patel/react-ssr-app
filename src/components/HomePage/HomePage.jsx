import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Card from 'react-bootstrap/Card';
import Spinner from 'react-bootstrap/Spinner';
import Container from 'react-bootstrap/Container';
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
      <Jumbotron fluid>
        <Container>
          <h1>Welcome Home!</h1>
          <Link to="/hello">Say Hello</Link>
        </Container>
      </Jumbotron>
      {isFetching && (
        <React.Fragment>
          <Spinner size="sm" />
          <label>Fetching data with redux...</label>
        </React.Fragment>
      )}
      {!!error && (
        <label className="error">Error fetching data</label>
      )}
      {data && data.length > 0 && (
        <Card>
          <Card.Body>
            <h3>Data fetched with Redux</h3>
            <ul>
              {data.map(item => <li key={item}>{item}</li>)}
            </ul>
          </Card.Body>
        </Card>
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
