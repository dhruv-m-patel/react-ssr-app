import Tester from '../../../tests/Tester';
import ReduxExamplePage from './ReduxExamplePage';

const tester = new Tester();

describe('ReduxExamplePage', () => {
  test('it should render', () => {
    const snapshot = tester.getSnapshot(ReduxExamplePage);
    expect(snapshot).toMatchSnapshot();
  });
});
