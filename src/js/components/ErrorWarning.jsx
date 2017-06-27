import React from 'react'
import PropTypes from 'prop-types'

export function renderHeader(props) {
  if(props.headerText) return props.headerText

  switch(props.error.status) {
    case 401:
    return 'You have been automatically logged out.'

    case 404:
    return 'Sorry, we couldn\'t find the data you\'re looking for.'

    case 500:
    return 'Sorry, there\'s a problem on our end.'

    default:
    return 'Sorry, an error has occurred.'
  }
}

export function renderBody(props) {
  if(props.bodyText) return props.bodyText

  switch(props.error.status) {
    case 401:
    return 'Please refresh the page to log in again.'

    case 404:
    return 'Please refresh the page. If this message persists, you will need to upload your file again.'

    case 500:
    return 'We\'re quickly on resolving the issue. Please try again soon.'

    default:
    return 'Please refresh the page. If this message persists, you will need to upload your file again.'
  }
}

const ErrorWarning = (props) => {
  if(!props.error) return null

  return (
    <div className="ErrorWarning usa-alert usa-alert-error">
      <div className="usa-alert-body">
        <h3 className="usa-alert-heading">{renderHeader(props)}</h3>
        <p className="usa-alert-text">{renderBody(props)}</p>
      </div>
    </div>
  )
}

ErrorWarning.propTypes = {
  error: PropTypes.object,
  bodyText: PropTypes.string,
  headerText: PropTypes.string
}

export default ErrorWarning
