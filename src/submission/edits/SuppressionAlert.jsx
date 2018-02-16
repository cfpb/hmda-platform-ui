import React from 'react'
import CSVDownloadHOC from '../../common/CSVDownloadHOC.jsx'
import Alert from '../../common/Alert.jsx'

export const SuppressionAlert = props => {
  const { institutionId, period, sequenceNumber } = props.submission.id
  return (
    <Alert type="warning">
      <p>
        Your file is too large to display tables of rows for each edit. To
        review the affected rows,{' '}
        <a
          href="#"
          onClick={e => {
            e.preventDefault()
            props.onDownloadClick(institutionId, period, sequenceNumber)
          }}
        >
          download the edit report
        </a>.
      </p>
    </Alert>
  )
}

export default CSVDownloadHOC(SuppressionAlert)
