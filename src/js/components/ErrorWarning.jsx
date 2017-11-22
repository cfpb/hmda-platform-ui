import React from 'react'
import PropTypes from 'prop-types'
import Alert from './Alert.jsx'

export function getHeading(props) {
  if (props.headerText) return props.headerText

  switch (props.error.status) {
    case 401:
      return 'You have been automatically logged out.'

    default:
      return 'Sorry, an error has occurred.'
  }
}

export function getText(props) {
  if (props.bodyText) return props.bodyText

  switch (props.error.status) {
    case 400:
      return 'Your request could not be completed. Please try again.'
    case 401:
      return 'Please log in to complete this request.'

    case 403:
      return 'Please log in to complete this request.'

    case 500:
      return "We're quickly on resolving the issue, please refresh the page."

    default:
      return 'Please refresh the page.'
  }
}

const ErrorWarning = props => {
  if (props.error)
    return (
      <div className="ErrorWarning">
        <Alert type="error" heading={getHeading(props)}>
          <p>
            {getText(props)} If the problem persists, contact{' '}
            <a href="mailto:hmdahelp@cfpb.gov">HMDA Help</a>.
          </p>
        </Alert>
      </div>
    )

  return null
}

ErrorWarning.propTypes = {
  error: PropTypes.object,
  bodyText: PropTypes.string,
  headerText: PropTypes.string
}

export default ErrorWarning
