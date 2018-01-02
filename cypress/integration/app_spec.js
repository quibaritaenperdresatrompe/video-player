/* eslint-disable no-undef, no-unused-expressions */

describe('Video player', () => {
  it('assert that <title> is correct', () => {
    cy.visit('/')
    cy.title().should('include', 'Video player')
  })

  it('have one video element', () => {
    cy.get('video').should('have.length', 1)
  })

  it('have controls visible', () => {
    cy.get('.Controls').should('be.visible')
  })
})

describe('Simple user story: play, wait, move, pause (with mouse)', () => {
  it('have a play/pause button', () => {
    cy.get('.PlayAndPause').should('be.visible')
  })

  it('can play the media', () => {
    cy.get('.PlayAndPause').click()
    cy.get('video').should($video => {
      expect($video.prop('paused')).to.be.false
    })
  })

  it('can pause (after 2s)', () => {
    cy.wait(2000)
    cy.get('.PlayAndPause').click()
    cy.get('video').should($video => {
      expect($video.prop('paused')).to.be.true
    })
  })
})

describe('Autohide controls', () => {
  it('can hide the controls (after 3s) during media is playing', () => {
    cy.get('.Controls').should('be.visible')
    cy.get('.PlayAndPause').click()
    cy.wait(3000)
    cy.get('.Controls').should('not.be.visible')
  })

  it('can show the controls when you move the mouse', () => {
    cy.get('video').trigger('mouseover')
    cy.get('.Controls').should('be.visible')
  })
})

describe('Mute sound', () => {
  it('have a sound button', () => {
    cy.get('video').trigger('mouseover')
    cy.get('.Sound').should('be.visible')
  })

  it('can mute the media', () => {
    cy.get('video').trigger('mouseover')
    cy.get('.Sound').click()
    cy.get('video').should($video => {
      expect($video.prop('muted')).to.be.true
    })
  })

  it('can unmute the media (after 1s)', () => {
    cy.wait(1000)
    cy.get('video').trigger('mouseover')
    cy.get('.Sound').click()
    cy.get('video').should($video => {
      expect($video.prop('muted')).to.be.false
    })
  })
})

describe('Fullscreen', () => {
  it('have a fullscreen button', () => {
    cy.get('video').trigger('mouseover')
    cy.get('.Fullscreen').should('be.visible')
  })

  it('can put on fullscreen mode', () => {
    cy.get('video').trigger('mouseover')
    cy.get('.Fullscreen').click()
    cy.get('video').should($video => {
      expect($video.attr('height')).to.be.equal('100%')
    })
  })

  it('can put off fullscreen mode (after 1s)', () => {
    cy.wait(1000)
    cy.get('video').trigger('mouseover')
    cy.get('.Fullscreen').click()
    cy.get('video').should($video => {
      expect($video.attr('height')).to.be.equal('480')
    })
  })
})
