import Player, { SPACE_KEY_CODE, ESC_KEY_CODE } from '../'

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
  {
    name: 'when is in fullscreen mode',
    state: {
      isFullscreenMode: true,
    },
  },
]

describe(Player.name, () => {
  itRendersAllMutations(Player, mutations)

  describe('lifecycle', function scope() {
    beforeEach(() => {
      this.Player = new Player()
    })

    describe('componentWillMount', () => {
      test('it calls addEventListener', () => {
        this.Player.handleKeyUp = jest.fn()
        window.addEventListener = jest.fn()
        this.Player.componentWillMount()
        expect(window.addEventListener).toHaveBeenCalledWith('keyup', this.Player.handleKeyUp)
      })
    })

    describe('componentWillUnmount', () => {
      test('it calls removeEventListener', () => {
        this.Player.handleKeyUp = jest.fn()
        window.removeEventListener = jest.fn()
        this.Player.componentWillUnmount()
        expect(window.removeEventListener).toHaveBeenCalledWith('keyup', this.Player.handleKeyUp)
      })
    })
  })

  describe('handlers', function scope() {
    beforeEach(() => {
      this.Player = new Player()
    })

    describe('handleEnterFullscreenMode', () => {
      test('it calls setState', () => {
        this.Player.setState = jest.fn()
        this.Player.handleEnterFullscreenMode()
        expect(this.Player.setState).toHaveBeenCalled()
      })
    })

    describe('handleExitFullscreenMode', () => {
      test('it calls setState', () => {
        this.Player.setState = jest.fn()
        this.Player.handleExitFullscreenMode()
        expect(this.Player.setState).toHaveBeenCalled()
      })
    })

    describe('handleKeyUp', () => {
      test('it does nothing', () => {
        this.Player.state = {
          isFocused: false,
        }
        this.Player.handlePause = jest.fn()
        this.Player.handlePlay = jest.fn()
        this.Player.handleExitFullscreenMode = jest.fn()
        this.Player.handleKeyUp({})
        expect(this.Player.handlePause).not.toHaveBeenCalled()
        expect(this.Player.handlePlay).not.toHaveBeenCalled()
        expect(this.Player.handleExitFullscreenMode).not.toHaveBeenCalled()
      })
      test('it does nothing', () => {
        this.Player.state = {
          isFocused: true,
        }
        const event = { keyCode: 0 }
        this.Player.handlePause = jest.fn()
        this.Player.handlePlay = jest.fn()
        this.Player.handleExitFullscreenMode = jest.fn()
        this.Player.handleKeyUp(event)
        expect(this.Player.handlePause).not.toHaveBeenCalled()
        expect(this.Player.handlePlay).not.toHaveBeenCalled()
        expect(this.Player.handleExitFullscreenMode).not.toHaveBeenCalled()
      })
      test('it calls handlePause', () => {
        this.Player.state = {
          isFocused: true,
          isPlaying: true,
        }
        const event = { keyCode: SPACE_KEY_CODE }
        this.Player.handlePause = jest.fn()
        this.Player.handlePlay = jest.fn()
        this.Player.handleKeyUp(event)
        expect(this.Player.handlePause).toHaveBeenCalled()
        expect(this.Player.handlePlay).not.toHaveBeenCalled()
      })
      test('it calls handlePlay', () => {
        this.Player.state = {
          isFocused: true,
          isPlaying: false,
        }
        const event = { keyCode: SPACE_KEY_CODE }
        this.Player.handlePause = jest.fn()
        this.Player.handlePlay = jest.fn()
        this.Player.handleKeyUp(event)
        expect(this.Player.handlePause).not.toHaveBeenCalled()
        expect(this.Player.handlePlay).toHaveBeenCalled()
      })
      test('it does nothing', () => {
        this.Player.state = {
          isFocused: true,
          isFullscreenMode: false,
        }
        const event = { keyCode: ESC_KEY_CODE }
        this.Player.handleExitFullscreenMode = jest.fn()
        this.Player.handleKeyUp(event)
        expect(this.Player.handleExitFullscreenMode).not.toHaveBeenCalled()
      })
      test('it calls handleExitFullscreenMode', () => {
        this.Player.state = {
          isFocused: true,
          isFullscreenMode: true,
        }
        const event = { keyCode: ESC_KEY_CODE }
        this.Player.handleExitFullscreenMode = jest.fn()
        this.Player.handleKeyUp(event)
        expect(this.Player.handleExitFullscreenMode).toHaveBeenCalled()
      })
    })

    describe('handleLoad', () => {
      test('it calls setState', () => {
        this.Player.setState = jest.fn()
        this.Player.handleLoad()
        expect(this.Player.setState).toHaveBeenCalled()
      })
    })

    describe('handleMouseEnter', () => {
      test('it calls showControlsBar and setState', () => {
        this.Player.showControlsBar = jest.fn()
        this.Player.setState = jest.fn()
        this.Player.handleMouseEnter()
        expect(this.Player.showControlsBar).toHaveBeenCalledWith(true)
        expect(this.Player.setState).toHaveBeenCalled()
      })
    })

    describe('handleMouseLeave', () => {
      test('it calls hideControlsBar and setState', () => {
        this.Player.hideControlsBar = jest.fn()
        this.Player.setState = jest.fn()
        this.Player.handleMouseLeave()
        expect(this.Player.hideControlsBar).toHaveBeenCalled()
        expect(this.Player.setState).toHaveBeenCalled()
      })
    })

    describe('handleMouseMove', () => {
      test('it calls showControlsBar', () => {
        this.Player.showControlsBar = jest.fn()
        this.Player.handleMouseMove()
        expect(this.Player.showControlsBar).toHaveBeenCalledWith(true)
      })
    })

    describe('handleMute', () => {
      test('it calls mute and setState', () => {
        this.Player.mute = jest.fn()
        this.Player.setState = jest.fn()
        this.Player.handleMute()
        expect(this.Player.mute).toHaveBeenCalled()
        expect(this.Player.setState).toHaveBeenCalled()
      })
    })

    describe('handlePause', () => {
      test('it calls pause, showControlsBar, and setState', () => {
        this.Player.pause = jest.fn()
        this.Player.setState = jest.fn()
        this.Player.showControlsBar = jest.fn()
        this.Player.handlePause()
        expect(this.Player.pause).toHaveBeenCalled()
        expect(this.Player.showControlsBar).toHaveBeenCalled()
        expect(this.Player.setState).toHaveBeenCalled()
      })
    })

    describe('handlePlay', () => {
      test('it calls play, hideControlsBar, and setState', () => {
        this.Player.play = jest.fn()
        this.Player.hideControlsBar = jest.fn()
        this.Player.setState = jest.fn()
        this.Player.handlePlay()
        expect(this.Player.play).toHaveBeenCalled()
        expect(this.Player.hideControlsBar).toHaveBeenCalledWith(true)
        expect(this.Player.setState).toHaveBeenCalled()
      })
    })

    describe('handleSeekTo', () => {
      test('it calls setState and sets player.currentTime', () => {
        this.Player.player = {
          currentTime: 9,
        }
        this.Player.setState = jest.fn()
        this.Player.handleSeekTo(10)
        expect(this.Player.setState).toHaveBeenCalled()
        expect(this.Player.player.currentTime).toBe(10)
      })
    })

    describe('handleTimeUpdate', () => {
      test('it calls setState', () => {
        this.Player.setState = jest.fn()
        this.Player.handleTimeUpdate()
        expect(this.Player.setState).toHaveBeenCalled()
      })
    })

    describe('handleUpdateVolumeTo', () => {
      test('it calls setState and sets player.volume', () => {
        this.Player.player = {
          volume: 0.9,
        }
        this.Player.setState = jest.fn()
        this.Player.handleUpdateVolumeTo(1)
        expect(this.Player.setState).toHaveBeenCalled()
        expect(this.Player.player.volume).toBe(1)
      })
    })

    describe('handleUnmute', () => {
      test('it calls unmute and setState', () => {
        this.Player.unmute = jest.fn()
        this.Player.setState = jest.fn()
        this.Player.handleUnmute()
        expect(this.Player.unmute).toHaveBeenCalled()
        expect(this.Player.setState).toHaveBeenCalled()
      })
    })
  })

  describe('functions', function scope() {
    beforeEach(() => {
      this.Player = new Player()
    })

    describe('hideControlsBar', () => {
      test('it calls hideControlsBarWithDelay', () => {
        this.Player.hideControlsBarWithDelay = jest.fn()
        this.Player.hideControlsBar(true)
        expect(this.Player.hideControlsBarWithDelay).toHaveBeenCalled()
      })
      test('it calls setState', () => {
        this.Player.setState = jest.fn()
        this.Player.hideControlsBar()
        expect(this.Player.setState).toHaveBeenCalled()
      })
    })

    describe('hideControlsBarWithDelay', () => {
      test('it calls window.setTimeout and setState', () => {
        jest.useFakeTimers()
        this.Player.setState = jest.fn()
        this.Player.hideControlsBarWithDelay()
        expect(window.setTimeout).toHaveBeenCalled()
        expect(this.Player.setState).toHaveBeenCalled()
      })
    })

    describe('mute', () => {
      test('it sets player.muted to true', () => {
        this.Player.player = {
          muted: false,
        }
        this.Player.mute()
        expect(this.Player.player.muted).toBe(true)
      })
    })

    describe('unmute', () => {
      test('it sets player.muted to false', () => {
        this.Player.player = {
          muted: true,
        }
        this.Player.unmute()
        expect(this.Player.player.muted).toBe(false)
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

    describe('showControlsBar', () => {
      test('it calls window.clearTimeout and setState', () => {
        jest.useFakeTimers()
        this.Player.setState = jest.fn()
        this.Player.showControlsBar()
        expect(window.clearTimeout).toHaveBeenCalled()
        expect(this.Player.setState).toHaveBeenCalled()
      })
    })
  })
})
