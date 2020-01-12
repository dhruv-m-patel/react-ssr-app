import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faToggleOn } from '@fortawesome/free-solid-svg-icons/faToggleOn';
import { faToggleOff } from '@fortawesome/free-solid-svg-icons/faToggleOff';
import Container from 'react-bootstrap/Container';
import DefaultHelmet from '../DefaultHelmet';
import './Page.css';
import '../../styles/themes.css';

export default function Page({
  title,
  description,
  children,
}) {
  const [hasSwitchedToDarkMode, setHasSwitchedToDarkMode] = useState(false);

  const switchToDarkMode = useCallback(() => {
    setHasSwitchedToDarkMode(!hasSwitchedToDarkMode);
  }, [hasSwitchedToDarkMode]);

  return (
    <Container fluid className={`page ${hasSwitchedToDarkMode ? 'dark-theme' : 'light-theme'}`}>
      <DefaultHelmet title={title} description={description} />
      <div className="text-right">
        Dark Mode
        <FontAwesomeIcon
          icon={hasSwitchedToDarkMode ? faToggleOn : faToggleOff}
          size="2x"
          onClick={switchToDarkMode}
          className="clickable pad-top-10px"
        />
      </div>
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
