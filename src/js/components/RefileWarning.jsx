import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router'
import RefileButton from '../containers/RefileButton.jsx'
import Alert from './Alert.jsx'
import {
  PARSED_WITH_ERRORS,
  VALIDATED_WITH_ERRORS
} from '../constants/statusCodes.js'

export const getText = props => {
  let text = null

  if (props.syntacticalValidityEditsExist) {
    text = [
      'Please update your file and select the "Upload a new file" button.',
      <RefileButton />
    ]
  } else if (!props.qualityVerified && props.page === 'quality') {
    text = [
      'You must verify the edits listed below and select the check box to confirm the accuracy of the data. If any of the data need to be corrected, please update your file and ',
      <RefileButton isLink={true} isLower={true} />,
      '.'
    ]
  } else if (!props.macroVerified && props.page === 'macro') {
    text = [
      'You must verify the edits listed below and select the check box to confirm the accuracy of the data. If any of the data need to be corrected, please update your file and ',
      <RefileButton isLink={true} isLower={true} />,
      '.'
    ]
  }

  if (props.code === PARSED_WITH_ERRORS) {
    text = [
      'Please update your file and click the "Upload a new file" button.',
      <RefileButton />
    ]
  }

  return text
}

export const getHeading = props => {
  let heading = null

  if (props.syntacticalValidityEditsExist) {
    heading = 'Your file has syntactical and/or validity edits.'
  } else if (!props.qualityVerified && props.page === 'quality') {
    heading = 'Your file has quality edits.'
  } else if (!props.macroVerified && props.page === 'macro') {
    heading = 'Your file has macro quality edits.'
  }

  if (props.code === PARSED_WITH_ERRORS) {
    heading = 'Your file has formatting errors.'
  }

  return heading
}

const RefileWarning = props => {
  if (props.code > VALIDATED_WITH_ERRORS && props.code < PARSED_WITH_ERRORS)
    return null
  if (
    props.page === 'syntacticalvalidity' &&
    !props.syntacticalValidityEditsExist
  )
    return null
  if (props.page === 'quality' && props.qualityVerified) return null
  if (props.page === 'macro' && props.macroVerified) return null
  if (props.page === 'upload' && props.code !== PARSED_WITH_ERRORS) return null
  if (props.page === 'confirmation') return null

  let alertClass = 'error'
  if (
    !props.syntacticalValidityEditsExist &&
    props.code !== PARSED_WITH_ERRORS
  ) {
    alertClass = 'warning'
  }

  return (
    <div className="RefileWarning">
      <Alert
        type={alertClass}
        heading={getHeading(props)}
        text={getText(props)}
      />
    </div>
  )
}

RefileWarning.propTypes = {
  // from /containers/submissionProgressHOC
  page: PropTypes.string,
  base: PropTypes.string,
  code: PropTypes.number,
  syntacticalValidityEditsExist: PropTypes.bool,
  qualityVerified: PropTypes.bool,
  macroVerified: PropTypes.bool
}

export default RefileWarning
