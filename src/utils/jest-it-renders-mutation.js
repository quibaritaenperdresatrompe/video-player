import React from 'react'
// eslint-disable-next-line import/no-extraneous-dependencies
import renderer from 'react-test-renderer'

export default (component, mutation) => {
  describe(mutation.name, () => {
    test('it renders correctly', () => {
      const wrapper = renderer.create(React.createElement(
        component,
        mutation.props,
      ))
      expect(wrapper.toJSON()).toMatchSnapshot()
    })
  })
}
