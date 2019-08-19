import React from 'react';
import PropTypes from 'prop-types';
import Container from 'react-bootstrap/Container';
import DefaultHelmet from '../DefaultHelmet';
import './Page.css';

// const cx = classnames.bind(styles);

export default function Page({
  title,
  description,
  children,
}) {
  return (
    <Container className="page">
      <DefaultHelmet title={title} description={description} />
      {children}
    </Container>
  );
}

Page.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string,
  description: PropTypes.string,
};

Page.defaultProps = {
  title: undefined,
  description: undefined,
}
