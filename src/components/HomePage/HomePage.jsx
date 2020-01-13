import React from 'react';
import { Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Page from '../Page';
import './HomePage.css';

export default function HomePage() {
  return (
    <Page>
      <div className="app">
        <header className="appHeader">
          <img src="/images/react.svg" className="appLogo" alt="logo" />
          <h2>React App</h2>
          <small>A React starter app with SSR support.</small>
        </header>
        <br />
        <br />
        <Container className="content">
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
                <li>Configuration (using <a href="https://www.npmjs.com/package/confit" target="blank">confit</a> / <a href="https://www.npmjs.com/package/meddleware" target="blank">meddleware</a>)</li>
                <li>Code splitting (using <a href="https://loadable-components.com/docs/getting-started/" target="blank">Loadable Components</a>)</li>
                <li>React Bootstrap</li>
              </ul>
              <br />
              <br />
              <Link className="appLink" to="/redux-example">View Example Page with Redux integration</Link>
            </Col>
          </Row>
        </Container>
      </div>
    </Page>
  );
}
