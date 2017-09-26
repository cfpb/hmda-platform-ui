jest.unmock('../../src/js/components/EditsHeaderDescription.jsx')

import React from 'react'
import ReactDOM from 'react-dom'
import TestUtils from 'react-addons-test-utils'
import Wrapper from '../Wrapper.js'
import EditsHeaderDescription, {
  getText
} from '../../src/js/components/EditsHeaderDescription.jsx'

describe('EditsHeaderDescription', function() {
  const header = TestUtils.renderIntoDocument(
    <Wrapper>
      <EditsHeaderDescription type="syntacticalvalidity" count={1} />
    </Wrapper>
  )
  const headerNode = ReactDOM.findDOMNode(header)

  it('renders the header', function() {
    expect(headerNode).toBeDefined()
  })

  it('sets the prop appropriately', function() {
    expect(header.props.children.props.type).toEqual('syntacticalvalidity')
    expect(header.props.children.props.count).toEqual(1)
  })
})

const syntacticalValidity = {
  id: 'syntacticalvalidity',
  title: 'Syntactical and validity edits',
  desc:
    'Syntactical edits show if the loan/application register format is incorrect and if the data doesn’t cover the correct filing year. Validity edits show if there are invalid values in data fields. Your HMDA data cannot be submitted until syntactical and validity edits are corrected in your file.'
}

const quality = {
  id: 'quality',
  title: 'Quality edits',
  desc:
    'Quality edits show if data fields do not conform to expected values. Your HMDA file cannot be submitted until the data has been verified or your file has been corrected.'
}

const macro = {
  id: 'macro',
  title: 'Macro edits',
  desc:
    'Macro quality edits check whether the submitted loan/application register as a whole conforms to expected values. The loan/application register cannot be submitted until the filer either confirms the accuracy of all the values flagged by the macro quality edits in the HMDA Platform or corrects the flagged values and reuploads the updated loan/application register to the HMDA Platform.'
}

describe('getText', () => {
  it('throws error if bad type', () => {
    try {
      getText('thisIsNotAType')
    } catch (err) {
      expect(err.message).toEqual(
        'Unexpected edit type. Unable to create edit description.'
      )
    }
  })

  it('throws error if missing type', () => {
    try {
      getText('')
    } catch (err) {
      expect(err.message).toEqual(
        'Missing edit type. Unable to create edit description.'
      )
    }
  })

  it('returns syntacticalValidity', () => {
    const returned = getText('syntacticalvalidity')
    expect(returned).toEqual(syntacticalValidity)
  })

  it('returns quality', () => {
    const returned = getText('quality')
    expect(returned).toEqual(quality)
  })

  it('returns macro', () => {
    const returned = getText('macro')
    expect(returned).toEqual(macro)
  })
})
