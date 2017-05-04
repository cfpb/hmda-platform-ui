import React, { Component, PropTypes } from 'react'
import Pagination from '../containers/Pagination.jsx'
import moment from 'moment'

const tableData = [
  { th: 'MSA/MD', td: 'id'},
  { th: 'MSA/MD Name', td: 'name'},
  { th: 'Total LARs', td: 'totalLars',},
  { th: 'Total Amt. (in thousands)', td: 'totalAmount'},
  { th: 'CONV', td: 'conv'},
  { th: 'FHA', td: 'FHA'},
  { th: 'VA', td: 'VA'},
  { th: 'FSA/RHS', td: 'FSA'},
  { th: '1-4 Family', td: 'oneToFourFamily'},
  { th: 'MFD', td: 'MFD'},
  { th: 'Multi-Family', td: 'multiFamily'},
  { th: 'Home Purchase', td: 'homePurchase'},
  { th: 'Home Improvement', td: 'homeImprovement'},
  { th: 'Refinance', td: 'refinance'}
]

const IRSReport = (props) => {
  if (!props.msas) return null
  if (props.msas.length === 0) return null

  return (
    <div className="IRSReport">
      <header>
        <h2>Institution Register Summary</h2>
        <p className="usa-font-lead">Please review your summarized HMDA data below. If the data are incorrect, please update your file and select the "Update a new file" button. You will need to begin the filing process again.</p>
      </header>

      <div className="irs-table-wrapper" id="irs">
        <table width="100%">
          <thead>
            <tr>
              <th colSpan={4}></th>
              <th colSpan={4}>Loan Type</th>
              <th colSpan={3}>Property Type</th>
              <th colSpan={3}>Loan Purpose</th>
            </tr>
            <tr>
              {tableData.map((data, i) => {
                return <th key={i}>{data.th}</th>
              })}
            </tr>
          </thead>
          <tbody>
            {props.msas.map((msa, i) => {
              return <tr key={i}>
                {tableData.map((data, i) => {
                  return <td key={i}>{msa[data.td]}</td>
                })}
              </tr>
            })}
            <tr className="totals">
              <td className="center" colSpan={2}><strong>Total</strong></td>
              <td>{props.summary.lars}</td>
              <td>{props.summary.amount}</td>
              {tableData.slice(4).map((data, i) => {
                return <td key={i}>{props.summary[data.td]}</td>
              })}
            </tr>
          </tbody>
        </table>
      </div>
      <Pagination target="irs" />
      <hr />
    </div>
  )
}

IRSReport.propTypes = {
  msas: PropTypes.array,
  summary: PropTypes.object,
  status: PropTypes.object
}

export default IRSReport
