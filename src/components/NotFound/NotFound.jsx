import React from 'react';
import Container from 'react-bootstrap/Container';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Page from '../Page';

export default function HomePage() {
  return (
    <Page>
      <Container>
        <Jumbotron>
          <h1>404 Not Found!</h1>
          <p>The page you are looking for was not found.</p>
        </Jumbotron>
      </Container>
    </Page>
  );
}
