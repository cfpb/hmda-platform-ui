import React, { Component, PropTypes } from 'react'
import Pagination from '../containers/Pagination.jsx'
import moment from 'moment'

const IRSReport = (props) => {
  if (!props.msas) return null

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
                <td>{msa.id}</td>
                <td>{msa.name}</td>
                <td>{msa.totalLars}</td>
                <td>{msa.totalAmount}</td>
                <td>{msa.conv}</td>
                <td>{msa.FHA}</td>
                <td>{msa.VA}</td>
                <td>{msa.FSA}</td>
                <td>{msa.oneToFourFamily}</td>
                <td>{msa.MFD}</td>
                <td>{msa.multiFamily}</td>
                <td>{msa.homePurchase}</td>
                <td>{msa.homeImprovement}</td>
                <td>{msa.refinance}</td>
              </tr>
            })}
            <tr className="totals">
              <td className="center" colSpan={2}><strong>Total</strong></td>
              <td>{props.summary.lars}</td>
              <td>{props.summary.amount}</td>
              <td>{props.summary.conv}</td>
              <td>{props.summary.FHA}</td>
              <td>{props.summary.VA}</td>
              <td>{props.summary.FSA}</td>
              <td>{props.summary.oneToFourFamily}</td>
              <td>{props.summary.MFD}</td>
              <td>{props.summary.multiFamily}</td>
              <td>{props.summary.homePurchase}</td>
              <td>{props.summary.homeImprovement}</td>
              <td>{props.summary.refinance}</td>
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
