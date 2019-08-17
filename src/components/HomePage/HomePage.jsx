import React from 'react';
import { Link } from 'react-router-dom';
import Page from '../Page';

export default function HomePage() {
  return (
    <Page>
      <h1>Welcome Home!</h1>
      <Link to="/hello">Say Hello</Link>
    </Page>
  );
}
