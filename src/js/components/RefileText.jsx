import React from 'react'

export const getStatus = (code) => {
  let status

  if(code > 7) {
    status = 'is in progress.'
    if(code === 11) status = 'has already been submitted.'
  }

  const message = status ? <p>The HMDA data for this filing year <strong>{status}</strong>.</p> : null

  return message
}

export const getNewFileMessage = (code) => {
  if(code === 11) return 'Your new HMDA file will not be submitted until you clear and/or verify all edits and submit the data.'

  return null
}

const RefileText = (props) => {
  return (
    <div className="RefileText">
      {getStatus(props.code)}
      <p className="question">
        Would you like to restart the filing process?
        {getNewFileMessage(props.code)}
      </p>
    </div>
  )
}

RefileText.propTypes = {
  code: React.PropTypes.number.isRequired
}

export default RefileText
