import React from 'react';
import { Link } from 'react-router-dom';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Page from '../Page';

export default function HomePage() {
  return (
    <Page>
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
            <li>
              Configuration (using{' '}
              <a href="https://www.npmjs.com/package/confit" target="blank">
                confit
              </a>{' '}
              /{' '}
              <a href="https://www.npmjs.com/package/meddleware" target="blank">
                meddleware
              </a>
              )
            </li>
            <li>
              Code splitting (using{' '}
              <a
                href="https://loadable-components.com/docs/getting-started/"
                target="blank"
              >
                Loadable Components
              </a>
              )
            </li>
            <li>React Bootstrap</li>
          </ul>
          <br />
          <br />
          <Link to="/redux-example">
            View Example Page with Redux integration
          </Link>
        </Col>
      </Row>
    </Page>
  );
}
