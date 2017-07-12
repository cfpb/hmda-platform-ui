import React from 'react'
import PropTypes from 'prop-types'
import Alert from './Alert.jsx'

export function getHeading(props) {
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

export function getText(props) {
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
  if(props.error) return (
    <div className="ErrorWarning">
      <Alert
        type='error'
        heading={getHeading(props)}
        text={getText(props)} />
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
