import SeekBar from '../'

import itRendersAllMutations from '../../../utils/jest-it-renders-all-mutations'

const mutations = [
  {
    name: 'without props',
    props: null,
  },
  {
    name: 'without currentTime and duration',
    props: {
      currentTime: 9,
      duration: 10,
    },
  },
  {
    name: 'when it is at the end',
    props: {
      currentTime: 10,
      duration: 10,
    },
  },
]

describe(SeekBar.name, () => {
  itRendersAllMutations(SeekBar, mutations)

  describe('handlers', function scope() {
    beforeEach(() => {
      this.Player = new SeekBar()
    })

    describe('handleChange', () => {
      test('it calls props.seekTo and setState', () => {
        this.Player.props = {
          seekTo: jest.fn(),
        }
        this.Player.setState = jest.fn()
        const event = { target: { value: 99 } }
        this.Player.handleChange(event)
        expect(this.Player.props.seekTo).toHaveBeenCalledWith(event.target.value)
        expect(this.Player.setState).toHaveBeenCalled()
      })
    })
  })
})
