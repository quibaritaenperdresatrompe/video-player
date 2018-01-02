export default (component) => {
  const { defaultProps } = component
  if (defaultProps) {
    const defaultPropFunctions = Object.entries(defaultProps).filter(prop => typeof prop[1] === 'function')
    if (defaultPropFunctions && defaultPropFunctions.length > 0) {
      defaultPropFunctions.forEach(prop => {
        const propName = prop[0]
        describe(`${propName} defaultProp`, () => {
          test('it calls correctly and returns', () => {
            const propDefinition = prop[1]
            expect(propDefinition()).toMatchSnapshot()
          })
        })
      })
    }
  }
}
