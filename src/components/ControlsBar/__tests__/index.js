import ControlsBar from '../'

import itRendersAllMutations from '../../../utils/jest-it-renders-all-mutations'

const mutations = [
  {
    name: 'without props',
    props: null,
  },
  {
    name: 'when it renders time',
    props: {
      currentTime: 99,
      duration: 999,
      pause: jest.fn(),
      play: jest.fn(),
    },
  },
  {
    name: 'when it renders play button',
    props: {
      pause: jest.fn(),
      play: jest.fn(),
      isPlaying: false,
      isComplete: false,
    },
  },
  {
    name: 'when it renders pause button',
    props: {
      pause: jest.fn(),
      play: jest.fn(),
      isPlaying: true,
    },
  },
  {
    name: 'when it renders replay button',
    props: {
      pause: jest.fn(),
      play: jest.fn(),
      isComplete: true,
    },
  },
]

describe(ControlsBar.name, () => {
  itRendersAllMutations(ControlsBar, mutations)
})
