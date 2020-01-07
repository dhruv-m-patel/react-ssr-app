import React from 'react';
import Page from '../Page';
import { Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './HomePage.css';

export default function HomePage() {
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
            <Col sm={{ offset: 1, span: 10 }} md={{ offset: 4, span: 4 }}>
              <h5>This starter-kit was built with:</h5>
              <ul>
                <li>React v16.8</li>
                <li>Redux</li>
                <li>React Router</li>
                <li>Webpack v4</li>
                <li>Babel v7</li>
                <li>Express v4</li>
                <li>Jest</li>
                <li>ESLint</li>
                <li>Stylelint</li>
                <li>Husky</li>
                <li>React Bootstrap 123</li>
              </ul>
              <br />
              <br />
              <Link className="App-link" to="/redux-example">View Example Page with Redux integration</Link>
            </Col>
          </Row>
        </Container>
      </div>
    </Page>
  );
}
