import React from 'react'
import Alert from './Alert.jsx'

const SubmissionPageInfo = () => {
  return (
    <section className="SubmissionPageInfo">
      <Alert
        type="info">
        <div>
          <p>Your filing is ready to be signed and submitted. Please review your filing summary and sign your filing at the bottom of this page.</p>
          <p>If you discover an error in the summary, you will need to update your file and upload it again.</p>
        </div>
      </Alert>
    </section>
  )
}

export default SubmissionPageInfo
