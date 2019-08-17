import React from 'react';
import { Link } from 'react-router-dom';
import Page from '../Page';

export default function HelloPage() {
  return (
    <Page>
      <h1>Hello World!</h1>
      <Link to="/">See Welcome Screen</Link>
    </Page>
  );
}
