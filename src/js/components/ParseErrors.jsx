import React, { Component, PropTypes } from 'react'

const renderErrorMessages = (messages) => {
  let errors = ''
  messages.map((message, i) => {
    errors = errors + message
  })
  return errors
}

const renderData = (larError) => {
  let data

  return (
    Object.keys(larError).map((error, i) => {
      if(error === 'errorMessages') {
        // the error messages are in an array
        data = renderErrorMessages(larError[error])
      } else {
        // the row number
        data = larError[error]
      }
      return <td key={i}>{data}</td>
    })
  )

}

const ParseErrors = (props) => {
  console.log('ParseErrors')
  console.log(props)
  return (
    <div className="ParseErrors usa-grid-full" id="parseErrors">
      <div className="padding-2 bg-color-gray-lightest">
        <h2 className="margin-top-0">Parsing Errors</h2>
        <p className="usa-font-lead margin-top-half margin-bottom-0">There are errors the prevented your file from being validated. You must fix these errors and re-upload your file.</p>
      </div>

      <div className="border margin-bottom-5 padding-1">
        <table className="margin-bottom-0" width="100%">
          <thead>
            <tr>
              <th>Row</th>
              <th>Errors</th>
            </tr>
          </thead>
          <tbody>
            {props.larErrors.map((larError, i) => {
              return <tr key={i}>{renderData(larError)}</tr>
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}

ParseErrors.propTypes = {
  transmittalSheetErrors: PropTypes.array,
  larErrors: PropTypes.array
}

export default ParseErrors
