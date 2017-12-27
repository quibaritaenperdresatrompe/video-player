import ControlsBar from '../'

import itRendersAllMutations from '../../../utils/jest-it-renders-all-mutations'

const mutations = [
  {
    name: 'without props',
    props: null,
  },
  {
    name: 'with all props',
    props: {
      currentTime: 99,
      duration: 999,
      pause: jest.fn(),
      play: jest.fn(),
    },
  },
  {
    name: 'without pause prop',
    props: {
      currentTime: 99,
      duration: 999,
      play: jest.fn(),
    },
  },
  {
    name: 'without play prop',
    props: {
      currentTime: 99,
      duration: 999,
      pause: jest.fn(),
    },
  },
]

describe(ControlsBar.name, () => {
  itRendersAllMutations(ControlsBar, mutations)
})
