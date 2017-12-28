import Player from '../'

import itRendersAllMutations from '../../../utils/jest-it-renders-all-mutations'

const mutations = [
  {
    name: 'without props',
    props: null,
  },
  {
    name: 'when ControlsBar is hidden',
    state: {
      isPlaying: true,
      isControlsBarHidden: true,
    },
  },
  {
    name: 'when is playing',
    state: {
      isPlaying: true,
    },
  },
]

describe(Player.name, () => {
  itRendersAllMutations(Player, mutations)

  describe('handlers', function () {
    beforeEach(() => {
      this.Player = new Player()
    })

    describe('handleOnLoad', () => {
      test('it calls setState', () => {
        this.Player.setState = jest.fn()
        this.Player.handleOnLoad()
        expect(this.Player.setState).toHaveBeenCalled()
      })
    })

    describe('handlePause', () => {
      test('it calls resetAutoHideControlsBarTimeout and setState', () => {
        this.Player.resetAutoHideControlsBarTimeout = jest.fn()
        this.Player.setState = jest.fn()
        this.Player.handlePause()
        expect(this.Player.resetAutoHideControlsBarTimeout).toHaveBeenCalled()
        expect(this.Player.setState).toHaveBeenCalled()
      })
    })

    describe('handlePlay', () => {
      test('it calls resetAutoHideControlsBarTimeout and setState', () => {
        this.Player.resetAutoHideControlsBarTimeout = jest.fn()
        this.Player.setState = jest.fn()
        this.Player.handlePlay()
        expect(this.Player.resetAutoHideControlsBarTimeout).toHaveBeenCalled()
        expect(this.Player.setState).toHaveBeenCalled()
      })
    })

    describe('handleTimeUpdate', () => {
      test('it calls setState', () => {
        this.Player.setState = jest.fn()
        this.Player.handleTimeUpdate()
        expect(this.Player.setState).toHaveBeenCalled()
      })
    })
  })

  describe('functions', function () {
    beforeEach(() => {
      this.Player = new Player()
    })

    describe('hideControlsBar', () => {
      test('it calls setState', () => {
        this.Player.setState = jest.fn()
        this.Player.hideControlsBar()
        expect(this.Player.setState).toHaveBeenCalled()
      })
    })

    describe('play', () => {
      test('it calls player.play', () => {
        this.Player.player = {
          play: jest.fn(),
        }
        this.Player.play()
        expect(this.Player.player.play).toHaveBeenCalled()
      })
    })

    describe('pause', () => {
      test('it calls player.pause', () => {
        this.Player.player = {
          pause: jest.fn(),
        }
        this.Player.pause()
        expect(this.Player.player.pause).toHaveBeenCalled()
      })
    })

    describe('resetAutoHideControlsBarTimeout', () => {
      test('it calls window.clearTimeout', () => {
        jest.useFakeTimers()
        this.Player.autoHideControlsBarTimeout = {}
        this.Player.resetAutoHideControlsBarTimeout()
        expect(window.clearTimeout).toHaveBeenCalledWith(this.Player.autoHideControlsBarTimeout)
      })
    })

    describe('setAutoHideControlsBarTimeout', () => {
      test('it calls window.setTimeout and sets autoHideControlsBarTimeout', () => {
        jest.useFakeTimers()
        this.Player.autoHideControlsBarTimeout = null
        this.Player.setAutoHideControlsBarTimeout()
        expect(window.setTimeout).toHaveBeenCalled()
        expect(this.Player.autoHideControlsBarTimeout).not.toBe(null)
      })
    })
  })
})
