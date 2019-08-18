import Tester from '../../../tests/Tester';
import HelloPage from './HelloPage';

const tester = new Tester();

describe('HelloPage', () => {
  test('it should render', () => {
    const snapshot = tester.getSnapshot(HelloPage);
    expect(snapshot).toMatchSnapshot();
  });
});
