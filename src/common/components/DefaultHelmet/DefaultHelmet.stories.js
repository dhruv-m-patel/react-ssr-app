import React from 'react';
import { storiesOf } from '@storybook/react';
import DefaultHelmet from './DefaultHelmet';

storiesOf('DefaultHelmet', module)
  .addDecorator(story => <div style={{ margin: '2rem' }}>{story()}</div>)
  .add('with default props', () => (
    <React.Fragment>
      <DefaultHelmet />
      <p>Inspect page markup in HEAD section to know more.</p>
    </React.Fragment>
  ))
  .add('with overrides', () => (
    <React.Fragment>
      <DefaultHelmet
        title="My Custom Title"
        description="This is a custom page description"
      />
      <p>Inspect page markup in HEAD section to know more.</p>
    </React.Fragment>
  ));
