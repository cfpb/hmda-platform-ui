import React from 'react'
import Alert from './Alert.jsx'

const SubmissionPageInfo = () => {
  return (
    <section className="RefileWarning">
      <Alert
        type="info"
        heading="Your filing is ready to be signed and submitted."
      >
        <div>
          <p>
            Please review your test filing summary and sign your test filing at
            the bottom of this page.
          </p>
          <p>
            If you discover an error in the summary, you will need to update
            your file and upload it again.
          </p>
        </div>
      </Alert>
    </section>
  )
}

export default SubmissionPageInfo
