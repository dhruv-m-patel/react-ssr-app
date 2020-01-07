import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Spinner from 'react-bootstrap/Spinner';
import Page from '../Page';
import './ReduxExamplePage.css';

export default function ReduxExamplePage({
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
      <div className="App">
        <header className="App-header">
          <img src="/images/react.svg" className="App-logo" alt="logo" />
          <h2>React App</h2>
          <small>A React starter app with SSR support.</small>
        </header>
        <br />
        <br />
        <Container className="Content">
          <Row>
            <Col sm={{ offset: 1, span: 10 }} md={{ offset: 3, span: 6 }}>
              <h4>An example page showing Redux integration</h4>
              <br />
              <br />
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
                <React.Fragment>
                  <h5>Following data was fetched using Redux</h5>
                  <ul>
                    {data.map(item => <li key={item}>{item}</li>)}
                  </ul>
                </React.Fragment>
              )}
              <br />
              <br />
              <Link className="App-link" to="/">View Home Page</Link>
            </Col>
          </Row>
        </Container>
      </div>
    </Page>
  );
}

ReduxExamplePage.propTypes = {
  isFetching: PropTypes.bool,
  error: PropTypes.string,
  data: PropTypes.arrayOf(PropTypes.string),
  fetchTestData: PropTypes.func,
};

ReduxExamplePage.defaultProps = {
  isFetching: false,
  error: undefined,
  data: undefined,
  fetchTestData: () => {},
};
