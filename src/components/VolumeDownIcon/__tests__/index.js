import VolumeDownIcon from '../'

import itRendersAllMutations from '../../../utils/jest-it-renders-all-mutations'

const mutations = [
  {
    name: 'without props',
    props: null,
  },
  {
    name: 'with all props',
    props: {
      backgroundColor: '#000',
      color: '#fff',
      size: '3em',
    },
  },
]

describe(VolumeDownIcon.name, () => {
  itRendersAllMutations(VolumeDownIcon, mutations)
})
