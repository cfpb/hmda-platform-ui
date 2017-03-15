import React, { Component, PropTypes } from 'react'
import moment from 'moment'

const IRSReport = (props) => {
  if (!props.msas) return null
  const isChecked = props.status.code > 10 ? true : false
  const isDisabled = props.status.code > 9 ? false : true

  return (
    <div className="IRSReport" id="irs">
      <header>
        <h2>Institution Register Summary</h2>
        <p className="usa-font-lead">Please review your summarized HMDA data below. If the data are incorrect, please update your file and select the "Update a new file" button. You will need to begin the filing process again.</p>
      </header>

      <table width="100%">
        <thead>
          <tr>
            <th colSpan="4"></th>
            <th colSpan="4">Loan Type</th>
            <th colSpan="3">Property Type</th>
            <th colSpan="3">Loan Purpose</th>
          </tr>
          <tr>
            <th>MSA/MD</th>
            <th>MSA/MD Name</th>
            <th>Total LARs</th>
            <th>Total Amt. <span>(in thousands)</span></th>
            <th>CONV</th>
            <th>FHA</th>
            <th>VA</th>
            <th>FSA/RHS</th>
            <th>1-4 Family</th>
            <th>MFD</th>
            <th>Multi-Family</th>
            <th>Home Purchase</th>
            <th>Home Improvement</th>
            <th>Refinance</th>
          </tr>
        </thead>
        <tbody>
          {props.msas.map((msa, i) => {
            return <tr key={i}>
              {Object.keys(msa).map((data, i) => {
                return <td key={i}>{msa[data]}</td>
              })}
            </tr>
          })}
        </tbody>
      </table>

      <hr />
    </div>
  )
}

IRSReport.propTypes = {
  msas: PropTypes.array,
  status: PropTypes.object
}

IRSReport.defaultProps = {
  msas: [],
  status: {
    code: null
  }
}

export default IRSReport
