jest.unmock('../../src/js/containers/SubmissionRouter.jsx')
import React from 'react'
import ReactDOM from 'react-dom'
import { browserHistory } from 'react-router'
import TestUtils from 'react-addons-test-utils'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import ConnectedRouter, {
  SubmissionRouter,
  mapStateToProps,
  mapDispatchToProps
} from '../../src/js/containers/SubmissionRouter.jsx'
import * as STATUS from '../../src/js/constants/statusCodes.js'
import Wrapper from '../Wrapper.js'

const replace = jest.fn()
browserHistory.replace = replace

const mockStore = configureMockStore([thunk])

describe('ConnectedRouter', () => {
  const store = mockStore({
    app: {
      submission: {
        id: { institutionId: '123' },
        status: { code: STATUS.VALIDATED }
      }
    }
  })
  console.error = jest.fn()
  const wrappedContainer = TestUtils.renderIntoDocument(
    <ConnectedRouter store={store} params={{ institution: '123' }}>
      <p>hey</p>
    </ConnectedRouter>
  )

  const containerNode = ReactDOM.findDOMNode(wrappedContainer).firstChild

  it('renders the component', () => {
    expect(containerNode).toBeDefined()
    expect(console.error).not.toBeCalled()
  })
})

describe('mapStateToProps', () => {
  it('maps state to props correctly', () => {
    expect(
      mapStateToProps(
        {
          app: {
            submission: {
              id: { institutionId: '123' },
              status: STATUS.VALIDATED
            }
          }
        },
        { params: 'argle' }
      )
    ).toEqual({
      submission: { id: { institutionId: '123' }, status: STATUS.VALIDATED },
      params: 'argle'
    })
  })
})

describe('mapDispatchToProps', () => {
  it('maps dispatch to props correctly', () => {
    expect(mapDispatchToProps('argle')).toEqual({
      dispatch: 'argle'
    })
  })
})

describe('replaceHistory', () => {
  it('replaces history correctly', () => {
    const router = new SubmissionRouter({
      params: { institution: 'argle', filing: 'bargle' }
    })
    router.replaceHistory('foofaraw')

    expect(replace).toBeCalledWith('/argle/bargle/foofaraw')
  })
})

describe('render', () => {
  it('renders with filled props', () => {
    const router = new SubmissionRouter({
      submission: {
        status: { code: STATUS.VALIDATED },
        id: { institutionId: 'argle' }
      },
      params: { institution: 'argle', splat: 'bargle' }
    })
    router.renderChildren = true
    const rendered = router.render()
    expect(rendered.type.displayName).toBe('Connect(SubmissionContainer)')
  })

  it('renders loading when uninitialized', () => {
    const router = new SubmissionRouter({
      submission: {
        status: { code: STATUS.UNINITIALIZED },
        id: { institutionId: 'argle' }
      },
      params: { institution: 'argle', splat: 'bargle' }
    })
    router.renderChildren = true
    const rendered = router.render()
    expect(rendered.type.name).toBe('LoadingIcon')
  })

  it('renders failed status when failed', () => {
    const router = new SubmissionRouter({
      submission: {
        status: { code: STATUS.FAILED, message: 'Failzone' },
        id: { institutionId: 'argle' }
      },
      params: { institution: 'elsewise', splat: 'bargle' }
    })
    const rendered = router.render()
    expect(rendered.props.children.props.children).toBe('Failzone')
  })
  it('renders loading when ids are not matched', () => {
    const router = new SubmissionRouter({
      submission: {
        status: { code: STATUS.VALIDATED },
        id: { institutionId: 'argle' }
      },
      params: { institution: 'elsewise', splat: 'bargle' }
    })
    router.renderChildren = true
    const rendered = router.render()
    expect(rendered.type.name).toBe('LoadingIcon')
  })

  it('renders loading when renderChildren is unset', () => {
    const router = new SubmissionRouter({
      submission: {
        status: { code: STATUS.VALIDATED },
        id: { institutionId: 'argle' }
      },
      params: { institution: 'argle', splat: 'bargle' }
    })

    const rendered = router.render()
    expect(rendered.type.name).toBe('LoadingIcon')
  })

  it('renders loading when no splat is present', () => {
    const router = new SubmissionRouter({
      submission: {
        status: { code: STATUS.VALIDATED },
        id: { institutionId: 'argle' }
      },
      params: { institution: 'argle' }
    })

    router.renderChildren = true

    const rendered = router.render()
    expect(rendered.type.name).toBe('LoadingIcon')
  })
})

describe('componentDidMount', () => {
  it('routes under normal circumstances', () => {
    const route = jest.fn()
    const dispatch = jest.fn()
    const router = new SubmissionRouter({
      submission: {
        status: { code: STATUS.VALIDATED },
        id: { institutionId: 'argle' }
      },
      params: { institution: 'argle' },
      dispatch: dispatch
    })

    router.route = route
    router.componentDidMount()

    expect(router.renderChildren).toBe(false)
    expect(route).toBeCalled()
    expect(dispatch).not.toBeCalled()
  })

  it('refreshes and routes when id exists and is unmatched', done => {
    const route = jest.fn()
    const dispatch = jest.fn(() => {
      return Promise.resolve()
    })
    const router = new SubmissionRouter({
      submission: {
        status: { code: STATUS.VALIDATED },
        id: { institutionId: 'argle' }
      },
      params: { institution: 'elsewise' },
      dispatch: dispatch
    })

    router.route = route
    router.componentDidMount()

    expect(dispatch.mock.calls.length).toBe(2)
    setTimeout(() => {
      expect(route).toBeCalled()
      done()
    }, 0)
  })

  it('routes with no status', done => {
    const route = jest.fn()
    const dispatch = jest.fn(() => {
      return Promise.resolve()
    })
    const router = new SubmissionRouter({
      submission: {
        status: null,
        id: { institutionId: 'argle' }
      },
      params: { institution: 'argle' },
      dispatch: dispatch
    })

    router.route = route
    router.componentDidMount()

    expect(dispatch.mock.calls.length).toBe(1)
    setTimeout(() => {
      expect(route).toBeCalled()
      done()
    }, 0)
  })

  it('routes with UNINITIALIZED status', done => {
    const route = jest.fn()
    const dispatch = jest.fn(() => {
      return Promise.resolve()
    })
    const router = new SubmissionRouter({
      submission: {
        status: { code: STATUS.UNINITIALIZED },
        id: { institutionId: 'argle' }
      },
      params: { institution: 'argle' },
      dispatch: dispatch
    })

    router.route = route
    router.componentDidMount()

    expect(dispatch.mock.calls.length).toBe(1)
    setTimeout(() => {
      expect(route).toBeCalled()
      done()
    }, 0)
  })
})

describe('route', () => {
  it('routes on before validated on upload page', () => {
    const force = jest.fn()
    const router = new SubmissionRouter({
      submission: {
        status: { code: STATUS.UPLOADING },
        id: { institutionId: 'argle' }
      },
      params: { institution: 'argle', splat: 'upload' }
    })
    router.forceUpdate = force
    router.route()
    expect(router.renderChildren).toBe(true)
    expect(force).toBeCalled()
  })

  it('routes on before validated not on upload page', () => {
    const replace = jest.fn()
    const router = new SubmissionRouter({
      submission: {
        status: { code: STATUS.UPLOADING },
        id: { institutionId: 'argle' }
      },
      params: { institution: 'argle' }
    })
    router.replaceHistory = replace
    router.route()
    expect(replace).toBeCalled()
  })

  it('routes on validated with errors on edit page', () => {
    const force = jest.fn()
    const router = new SubmissionRouter({
      submission: {
        status: { code: STATUS.VALIDATED_WITH_ERRORS },
        id: { institutionId: 'argle' }
      },
      params: { institution: 'argle', splat: 'quality' }
    })
    router.forceUpdate = force
    router.route()
    expect(force).toBeCalled()
  })

  it('routes on validated with errors not on edit page', () => {
    const replace = jest.fn()
    const router = new SubmissionRouter({
      submission: {
        status: { code: STATUS.VALIDATED_WITH_ERRORS },
        id: { institutionId: 'argle' }
      },
      params: { institution: 'argle' }
    })
    router.replaceHistory = replace
    router.route()
    expect(replace).toBeCalledWith('syntacticalvalidity')
  })

  it('routes without splat when validated  or signed', () => {
    const replace = jest.fn()
    const router = new SubmissionRouter({
      submission: {
        status: { code: STATUS.VALIDATED },
        id: { institutionId: 'argle' }
      },
      params: { institution: 'argle' }
    })
    router.replaceHistory = replace
    router.route()
    expect(replace).toBeCalledWith('submission')
  })

  it('routes on validated with splat', () => {
    const force = jest.fn()
    const router = new SubmissionRouter({
      submission: {
        status: { code: STATUS.VALIDATED },
        id: { institutionId: 'argle' }
      },
      params: { institution: 'argle', splat: 'quality' }
    })
    router.forceUpdate = force
    router.route()
    expect(force).toBeCalled()
  })
})
