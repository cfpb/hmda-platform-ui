import React from 'react'
import TestUtils from 'react-dom/test-utils'
import * as reactRouter from 'react-router'
import * as redirect from '../utils/redirect'
import * as AccessToken from '../api/AccessToken.js'
import WrappedContainer, {
  oidcCallback,
  mapStateToProps
} from './oidcCallback.jsx'
import Wrapper from '../../test-resources/Wrapper.js'

jest.unmock('./oidcCallback.jsx')
jest.mock('react-router')
jest.mock('../utils/redirect.js')
jest.mock('../api/AccessToken.js')

const replace = jest.fn()
reactRouter.browserHistory = {
  replace: replace
}

redirect.getUserManager = () => {
  return {
    signinRedirectCallback() {
      return Promise.resolve({})
    }
  }
}

const defaultState = {
  app: {
    error: null
  }
}

window.HMDA_ENV = { APP_SUFFIX: '/filing/', HOMEPAGE_URL: 'home' }

describe('oidcCallback', () => {
  it('renders the connected component', done => {
    const set = jest.fn()
    AccessToken.set = set

    const restore = jest.fn()
    redirect.restorePage = restore
    const wrappedConnected = TestUtils.renderIntoDocument(
      <Wrapper store={defaultState}>
        <WrappedContainer location={{ hash: '123' }} />
      </Wrapper>
    )

    const wrapped = TestUtils.scryRenderedDOMComponentsWithClass(
      wrappedConnected,
      'floatingIcon'
    )
    setTimeout(() => {
      expect(wrapped).toBeDefined()
      expect(set).toBeCalled()
      expect(restore).toBeCalled()
      expect(replace).not.toBeCalled()
      done()
    }, 0)
  })

  it('dispatches an error on errback', done => {
    const set = jest.fn()
    AccessToken.set = set

    const restore = jest.fn()
    redirect.restorePage = restore
    const dispatch = jest.fn()
    redirect.getUserManager = () => {
      return {
        signinRedirectCallback() {
          return Promise.reject('oi')
        }
      }
    }

    const oidc = new oidcCallback({
      dispatch: dispatch,
      location: { hash: '123' }
    })

    oidc.componentDidMount()

    setTimeout(() => {
      expect(set).not.toBeCalled()
      expect(restore).not.toBeCalled()
      expect(dispatch).toBeCalledWith({ error: 'oi', type: 'RECEIVE_ERROR' })
      done()
    }, 0)
  })

  it('redirects to home with no hash when mounting', () => {
    const oidc = new oidcCallback({
      dispatch: jest.fn(),
      location: { hash: null }
    })
    oidc.componentDidMount()
    expect(replace).toBeCalled()
    const getUM = jest.fn()
    redirect.getUserManager = getUM
    oidc.componentDidMount()
    expect(getUM).not.toBeCalled()
  })

  it('renders an error if theres an error in state', () => {
    window.HMDA_ENV = { FILING_APP_URL: 'website.cool' }
    const oidc = new oidcCallback({
      dispatch: jest.fn(),
      location: { hash: '123' },
      error: new Error('yikes')
    })
    const rendered = oidc.render()
    expect(rendered.props.type).toBe('error')
    expect(oidc.render()).toEqual(oidc.renderError())
  })

  it('maps state to props', () => {
    const mapped = mapStateToProps(defaultState)

    expect(Object.keys(mapped)).toEqual(['error'])
    expect(mapped.error).toBe(null)

    const mappedError = mapStateToProps({
      app: {
        error: new Error('yikes')
      }
    })
    expect(mappedError.error).toEqual(new Error('yikes'))
  })
})
