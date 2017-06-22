import React from 'react'
import PropTypes from 'prop-types'
import Pagination from '../containers/Pagination.jsx'

const renderTSErrors = ({transmittalSheetErrors}) => {
  if(transmittalSheetErrors.length === 0) return null
  return (
    <table width="100%">
      <caption>
        <h3>Transmittal Sheet Errors</h3>
        <p>Formatting errors in the transmittal sheet, the first row of your HMDA file.</p>
      </caption>
      <thead>
        <tr>
          <th>Row</th>
          <th>Transmittal Sheet Errors</th>
        </tr>
      </thead>
      <tbody>
        {transmittalSheetErrors.map((tsError, i) => {
          return <tr key={i}><td>1</td><td>{tsError}</td></tr>
        })}
      </tbody>
    </table>
  )
}

const makeTable = (className, pagination) => {

  const rows = []
  for(var i=0; i<pagination.count; i++) {
    rows.push(0)
  }

  return (
    <table className={className}>
      <thead>
        <tr>
          <th>&nbsp;</th>
        </tr>
      </thead>
      <tbody>
      {rows.map((v, i) => {
        return (
          <tr key={i}>
            <td>&nbsp;</td>
          </tr>
        )
     })}
      </tbody>
    </table>
  )
}

const renderLarErrors= ({larErrors, ...props}) => {
  if(larErrors.length === 0) return null

  let prevClass = 'PaginationPrev'
  let centerClass = 'PaginationTarget'
  let nextClass = 'PaginationNext'

  if(props.paginationSlide === 'left'){
    centerClass += ' slideLeft'
    nextClass += ' slideLeft'
  }else if(props.paginationSlide === 'right'){
    prevClass += ' slideRight'
    centerClass += ' slideRight'
  }

  return (
    <div className="PaginationTargetWrapper">
      {makeTable(prevClass, props.pagination)}
      <table className={centerClass} id="parseErrors" width="100%">
        <caption>
          <h3>LAR Errors</h3>
          <p>Formatting errors in loan application records, arranged by row.</p>
        </caption>
        <thead>
          <tr>
            <th>Row</th>
            <th>Errors</th>
          </tr>
        </thead>
        <tbody>
          {larErrors.map((larErrorObj, i) => {
            return larErrorObj.errorMessages.map((message, i) => {
              return (
                <tr key={i}>
                  <td>{larErrorObj.lineNumber}</td>
                  <td>{message}</td>
                </tr>
              )
            })
          })}
        </tbody>
      </table>
      {makeTable(nextClass, props.pagination)}
    </div>
  )
}

const ParseErrors = (props) => {
  console.log('isFetching', props.isFetching)
  if(!props.larErrors) return null

  const total = props.pagination && props.pagination.total + props.transmittalSheetErrors.length
  const errorText = total > 1 ? 'Rows' : 'Row'

  return (
    <div className='ParseErrors usa-grid-full' id="parseErrors">
      <header>
        {!props.pagination ? null : <h2>{total} {errorText} with Formatting Errors</h2>}
        <p className="usa-font-lead">The uploaded file is not formatted according to the requirements specified in the <a rel="noopener noreferrer" target="_blank" href="https://www.consumerfinance.gov/data-research/hmda/static/for-filers/2017/2017-HMDA-FIG.pdf">Filing Instructions Guide for data collected in 2017</a>.</p>
      </header>
      {renderTSErrors(props)}
      {renderLarErrors(props)}
      <Pagination isFetching={props.isFetching} target="parseErrors"/>
    </div>
  )
}

ParseErrors.propTypes = {
  pagination: PropTypes.number,
  paginationSlide: PropTypes.number,
  transmittalSheetErrors: PropTypes.array.isRequired,
  larErrors: PropTypes.array.isRequired,
  isFetching: PropTypes.bool.isRequired
}

export default ParseErrors
