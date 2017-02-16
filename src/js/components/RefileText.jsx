import React from 'react'

const RefileText = (props) => {
  let message

  if(props.code > 7) {
    message = 'is in progress'
    if(props.code === 11) message = 'has already been submitted'
  }

  return (
    <div className="RefileText">
      {message ? <p>The HMDA data for this filing year <strong>{message}</strong>.</p>:null}
      <p className="question">Would you like to start the resubmission process?</p>
    </div>
  )
}

RefileText.propTypes = {
  code: React.PropTypes.number.isRequired
}

export default RefileText
