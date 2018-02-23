import React from 'react'
import Alert from '../../common/Alert.jsx'

export const SuppressionAlert = props => {
  const { institutionId, period, sequenceNumber } = props.submission.id
  return (
    <Alert type="warning">
      <p>
        Sorry, we can't display tables of rows for each of your edits. To review
        the affected rows,{' '}
        <a
          href="#"
          onClick={props.onDownloadClick(institutionId, period, sequenceNumber)}
        >
          download the edit report
        </a>.
      </p>
    </Alert>
  )
}

export default SuppressionAlert
