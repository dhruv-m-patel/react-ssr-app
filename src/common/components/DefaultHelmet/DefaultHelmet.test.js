import Tester from '../../../../tests/Tester';
import DefaultHelmet from './DefaultHelmet';

const tester = new Tester();

describe('DefaultHelmet', () => {
  test('it should render', () => {
    const snapshot = tester.getSnapshot(DefaultHelmet, {
      title: 'test app',
      description: 'just testing',
    });
    expect(snapshot).toMatchSnapshot();
  });
});
