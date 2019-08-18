import React from 'react';
import Tester from '../../../tests/Tester';
import NotFound from './NotFound';

const tester = new Tester();

describe('NotFound', () => {
  test('it should render', () => {
    const snapshot = tester.getSnapshot(NotFound);
    expect(snapshot).toMatchSnapshot();
  });
});
