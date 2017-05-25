jest.unmock('../../src/js/containers/ConfirmationModal.jsx')
jest.mock('react-router')



import React from 'react'
import * as reactRouter from 'react-router'
import TestUtils from 'react-addons-test-utils'
import Wrapper from '../Wrapper.js'
import Connected, {
  ConfirmationModalContainer,
  mapStateToProps,
  mapDispatchToProps
} from '../../src/js/containers/ConfirmationModal.jsx'

const replace = jest.fn()
reactRouter.browserHistory = {
  replace: replace
}

const mockedState = {
  app: {
    confirmation: {
      showing: true
    },
    institution: {
      id: '123'
    },
    filingPeriod: '2017',
    submission: {
      status: {
        code: 8
      }
    },
    upload: {
      file: {},
      newFile: {}
    }
  }
}

describe('ConfirmationModal Container', () => {
  it('renders the unwrapped component', () => {
    const err = console.error
    console.error = jest.fn()
    const rendered = TestUtils.renderIntoDocument(
      <ConfirmationModalContainer
        id='123'
        filingPeriod='456'
        code={8}
        showing={true}
        file={{}}
        newFile={{}}
      />
    )

    expect(rendered).toBeDefined()
    expect(console.error).not.toBeCalled()

    const renderedWithNoProps = TestUtils.renderIntoDocument(
      <ConfirmationModalContainer/>
    )
    expect(rendered).toBeDefined()
    expect(console.error).not.toBeCalled()
  })

  it('maps state to props', () => {
    expect(mapStateToProps(mockedState)).toEqual({
      id: '123',
      filingPeriod: '2017',
      code: 8,
      showing: true,
      file: {},
      newFile: {}
    })
  })

  it('maps dispatch appropriately', done => {
    const dispatch = jest.fn(() => Promise.resolve())
    const mapped = mapDispatchToProps(dispatch)

    expect(Object.keys(mapped)).toEqual(['hideConfirmModal','triggerRefile'])

    mapped.triggerRefile().then(() => {
      expect(replace).toBeCalled()
      done()
    })

    expect(dispatch.mock.calls.length).toBe(1)

    mapped.triggerRefile('a', 'b', 'upload')
    expect(dispatch.mock.calls.length).toBe(3)

    mapped.hideConfirmModal()
    expect(dispatch.mock.calls.length).toBe(4)
  })

  it('throws on bad state', () => {
    expect(()=>{mapStateToProps()}).toThrow()
  })

  it('renders the connected component', () => {
    const err = console.error
    console.error = jest.fn()
    const connected = TestUtils.renderIntoDocument(
      <Wrapper store={mockedState}>
        <Connected/>
      </Wrapper>
    )

    expect(connected).toBeDefined()
    expect(console.error).not.toBeCalled()
    console.error = err
  })

})
