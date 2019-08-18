import React from 'react';
import Enzyme, { shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { JSDOM } from 'jsdom';
import renderer from 'react-test-renderer';
import { MemoryRouter } from 'react-router-dom';

// Stateless components return null when using instance() in React 16.X
// Hence there is no way to retrieve actual props for stateless components
// https://airbnb.io/enzyme/docs/api/ShallowWrapper/instance.html#returns-react-16x
// https://airbnb.io/enzyme/docs/api/ReactWrapper/instance.html#instance--reactcomponent

export default class Tester {
  constructor() {
    Enzyme.configure({ adapter: new Adapter() });
  }

  // eslint-disable-next-line class-methods-use-this
  getShallowInstance(Component, props) {
    const component = shallow(<Component {...props} />);
    return {
      props: (component.instance() || {}).props || props,
      component,
    };
  }

  // eslint-disable-next-line class-methods-use-this
  setupDomEnvironment() {
    if (global && global.window && global.document) {
      // dom environment already setup
      return;
    }

    const dom = new JSDOM(
      '<!doctype html><html><body></body></html>',
      { url: 'http://localhost/' },
    );
    const { window } = dom;
    global.window = window;
    global.document = window.document;
    global.navigator = {
      userAgent: 'node.js',
    };

    const props = Object.getOwnPropertyNames(window)
      .filter(prop => typeof global[prop] === 'undefined')
      .map(prop => Object.getOwnPropertyDescriptor(window, prop));

    Object.defineProperties(global, props);
  }

  getMountedInstance(Component, props) {
    this.setupDomEnvironment();

    const component = mount((
      <MemoryRouter>
        <Component {...props} />
      </MemoryRouter>
    ));

    return {
      // Stateless components return null when using instance() in React 16.X
      // Hence there is no way to retrieve actual props for stateless components

      props: (component.instance() || {}).props || props,
      component,
    };
  }

  getSnapshot(Component, props) {
    return renderer.create(
      <MemoryRouter>
        <Component {...props} />
      </MemoryRouter>
    ).toJSON();
  }
}
