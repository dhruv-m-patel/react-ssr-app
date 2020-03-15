import Tester from '../../../../tests/Tester';
import HomePage from './HomePage';

const tester = new Tester();

describe('HomePage', () => {
  test('it should render', () => {
    const snapshot = tester.getSnapshot(HomePage);
    expect(snapshot).toMatchSnapshot();
  });
});
