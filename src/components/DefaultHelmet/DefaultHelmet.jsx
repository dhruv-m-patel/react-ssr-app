import React from 'react';
import { Helmet } from 'react-helmet';
import PropTypes from 'prop-types';

export default function DefaultHelmet({ title, description }) {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
    </Helmet>
  );
}

DefaultHelmet.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
};

DefaultHelmet.defaultProps = {
  title: 'react-ssr-app',
  description: 'A boilerplate react app with SSR support using express, babel7 and webpack4',
};
