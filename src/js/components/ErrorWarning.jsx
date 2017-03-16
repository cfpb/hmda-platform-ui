import React from 'react'

export function renderHeader(props) {
  switch(props.error.httpStatus) {
    case 403:
    return 'You have been automatically logged out.'

    case 404:
    return 'Sorry, there is an unrecoverable problem with this filing.'

    case 500:
    return 'Sorry, there\'s a problem on our end.'

    default:
    return 'Sorry, an error has occurred.'
  }
}

export function renderBody(props) {
  switch(props.error.httpStatus) {
    case 403:
    return 'Please refresh the page to log in again.'

    case 404:
    return 'Please upload your file again.'

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

export default ErrorWarning
