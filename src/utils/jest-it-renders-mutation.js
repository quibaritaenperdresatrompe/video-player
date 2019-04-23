import React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import renderer from 'react-test-renderer';

export default (component, mutation) => {
  describe(mutation.name, () => {
    test('it renders correctly', () => {
      const element = React.createElement(component, mutation.props);
      const wrapper = renderer.create(element);
      if (mutation.state) {
        wrapper.getInstance().setState(() => ({ ...mutation.state }));
      }
      expect(wrapper.toJSON()).toMatchSnapshot();
    });
  });
};
