import React from 'react'

export const getStatus = (code) => {
  let status

  if(code > 7) {
    status = 'is in progress'
    if(code === 11) status = 'has already been submitted'
  }

  const message = status ? <p>The HMDA data for this filing year <strong>{status}</strong>.</p> : null

  return message
}
const RefileText = (props) => {
  return (
    <div className="RefileText">
      {getStatus(props.code)}
      <p className="question">Would you like to start the resubmission process?</p>
    </div>
  )
}

RefileText.propTypes = {
  code: React.PropTypes.number.isRequired
}

export default RefileText
