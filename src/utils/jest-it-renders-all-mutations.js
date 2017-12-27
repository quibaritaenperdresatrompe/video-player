import itRendersMutation from './jest-it-renders-mutation'

export default (component, mutations) => {
  if (mutations && mutations.length > 0) {
    mutations.forEach(mutation => itRendersMutation(component, mutation))
  }
}
