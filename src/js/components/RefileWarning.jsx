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
  const { institutionId, period, sequenceNumber } = props.submission.id
  let text = null
  let button = <RefileButton />
  let periodAfter = false
  let reviewAndDownload = (
    <div>
      Please review the edits or{' '}
      <a
        href="#"
        onClick={e => {
          e.preventDefault()
          props.onDownloadClick(institutionId, period, sequenceNumber)
        }}
      >
        download the edit report
      </a>.
    </div>
  )

  if (props.syntacticalValidityEditsExist) {
    text = 'Then update your file and select the "Upload a new file" button.'
  } else if (
    (!props.qualityVerified && props.page === 'quality') ||
    (!props.macroVerified && props.page === 'macro')
  ) {
    text =
      'You must verify the edits and select the check box to confirm the data is accurate. If the data need to be corrected, please update your file and '
    button = <RefileButton isLink={true} isLower={true} />
    periodAfter = true
  }
  if (props.code === PARSED_WITH_ERRORS) {
    reviewAndDownload = null
    text = 'Please update your file and select the "Upload a new file" button.'
  }

  if (!text) return null

  return (
    <div>
      {reviewAndDownload}
      {text}
      {button}
      {periodAfter ? '.' : null}
    </div>
  )
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
  if (props.page === 'submission') return null

  let alertClass = 'error'
  if (
    !props.syntacticalValidityEditsExist &&
    props.code !== PARSED_WITH_ERRORS
  ) {
    alertClass = 'warning'
  }

  return (
    <div className="RefileWarning">
      <Alert type={alertClass} heading={getHeading(props)}>
        {getText(props)}
      </Alert>
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
  macroVerified: PropTypes.bool,
  // from /containers/RefileWarning
  submission: PropTypes.object,
  onDownloadClick: PropTypes.func
}

export default RefileWarning
