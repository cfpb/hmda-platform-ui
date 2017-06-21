jest.unmock('../../src/js/containers/App.jsx')
jest.mock('../../src/js/components/Header.jsx', () => jest.fn(() => null))
jest.mock('../../src/js/containers/ConfirmationModal.jsx')
jest.mock('detect-browser', () => {return {name: 'ie', version: '9.0.0'}})
import React from 'react'
import ReactDOM from 'react-dom'
import TestUtils from 'react-addons-test-utils'
import ConnectedAppContainer, {AppContainer, mapStateToProps } from '../../src/js/containers/App.jsx'
import * as AccessToken from '../../src/js/api/AccessToken.js'
import * as redirect from '../../src/js/utils/redirect.js'
import Wrapper from '../Wrapper.js'
import browser from 'detect-browser'

const set = jest.fn()
AccessToken.set = set

const signinRedirect = jest.fn()
redirect.signinRedirect = signinRedirect

describe('AppContainer', () => {
  console.error = jest.fn()
  const wrappedContainer = TestUtils.renderIntoDocument(
    <Wrapper store={{
      app:{
        user: {
          expired: false
        }
      },
      oidc: {
        user: {
          profile: {
            name:'auser'
          }
        }
      }
    }}>
      <ConnectedAppContainer location={{}}><p>hey</p></ConnectedAppContainer>
    </Wrapper>
  )

  const containerNode = ReactDOM.findDOMNode(wrappedContainer).firstChild

  it('renders the component', () => {
    expect(containerNode).toBeDefined()
    expect(containerNode.firstChild.textContent).toEqual('Skip to main content')
    expect(console.error).not.toBeCalled()
  })

  it('maps state to props correctly', () => {
    expect(mapStateToProps({oidc:1, app: {user: {expired:2}}})).toEqual({
      oidc:1,
      expired:2
    })
  })

  it('sets accesstoken when needed', () => {
    const container = TestUtils.renderIntoDocument(
    <Wrapper store={{}}>
      <AppContainer
        oidc={{user:{access_token:1}}}
        location={{pathname: '/fake'}}
        expired={false}
      />
    </Wrapper>
    )
    expect(set.mock.calls.length).toBe(2)
  })

  it('short circuits token set with no user', () => {
    const container = TestUtils.renderIntoDocument(
    <Wrapper store={{}}>
      <AppContainer
        oidc={{user:null}}
        location={{pathname: '/fake'}}
        expired={false}
      />
    </Wrapper>
    )
    expect(set.mock.calls.length).toBe(2)
    expect(ReactDOM.findDOMNode(container)).toBe(null)
    expect(signinRedirect).toHaveBeenCalled()
  })

  it('short circuits token set with no user, when user not needed', () => {
    const container = TestUtils.renderIntoDocument(
    <Wrapper store={{}}>
      <AppContainer
        oidc={{user:null}}
        location={{pathname: '/'}}
        expired={false}
      />
    </Wrapper>
    )
    expect(set.mock.calls.length).toBe(2)
    expect(ReactDOM.findDOMNode(container)).not.toBe(null)
  })

  it('does not call signinRedirect if not expired', () => {
    const signinRedirect = jest.fn()
    redirect.signinRedirect = signinRedirect

    const container = TestUtils.renderIntoDocument(
    <Wrapper store={{}}>
      <AppContainer
        oidc={{user:{access_token:1}}}
        location={{pathname: '/fake'}}
        expired={false}
      />
    </Wrapper>
    )
    expect(set.mock.calls.length).toBe(3)
    expect(signinRedirect).not.toBeCalled()
  })

  it('does not call signinRedirect if page does not need user', () => {
    const signinRedirect = jest.fn()
    redirect.signinRedirect = signinRedirect

    const container = TestUtils.renderIntoDocument(
    <Wrapper store={{}}>
      <AppContainer
        oidc={{user:{access_token:1}}}
        location={{pathname: '/'}}
        expired={false}
      />
    </Wrapper>
    )

    expect(signinRedirect).not.toBeCalled()
  })

  browser.name = 'qwe'
  it('redirects when needed user is expired', () => {
    const signinRedirect = jest.fn()
    redirect.signinRedirect = signinRedirect

    const container = TestUtils.renderIntoDocument(
    <Wrapper store={{}}>
      <AppContainer
        oidc={{user:{access_token:1}}}
        location={{pathname: '/fake'}}
        expired={true}
      />
    </Wrapper>
    )

    expect(signinRedirect).toBeCalled()
    expect(ReactDOM.findDOMNode(container)).toBe(null)
  })
})
