import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from "react-router-dom";
import Router from '../components/router';

const supportsHistory = typeof window !== 'undefined' && 'pushState' in window.history;

ReactDOM.hydrate(
  <BrowserRouter forceRefresh={!supportsHistory}>
    <Router />
  </BrowserRouter>,
  document.getElementById('root'),
);
