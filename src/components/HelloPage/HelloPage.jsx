import React from 'react';
import { Link } from 'react-router-dom';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Container from 'react-bootstrap/Container';
import Image from 'react-bootstrap/Image';
import Page from '../Page';

export default function HelloPage() {
  return (
    <Page>
      <Jumbotron fluid>
        <Container>
          <h1>Hello World!</h1>
          <Link to="/">See Welcome Screen</Link>
        </Container>
      </Jumbotron>
      <Container>
        <Image src="/images/web.png" alt="" roundedCircle style={{ maxWidth: '300px' }} />
      </Container>
    </Page>
  );
}
