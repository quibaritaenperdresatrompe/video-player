import itRendersMutation from './jest-it-renders-mutation'
import itRendersAllDefaultPropFunctions from './jest-it-calls-all-default-prop-functions'

export default (component, mutations) => {
  itRendersAllDefaultPropFunctions(component)

  if (mutations && mutations.length > 0) {
    mutations.forEach(mutation => itRendersMutation(component, mutation))
  }
}
