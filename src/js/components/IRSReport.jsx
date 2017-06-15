import React, { Component, PropTypes } from 'react'
import Pagination from '../containers/Pagination.jsx'
import moment from 'moment'

const IRSReport = (props) => {
  console.log('IRSReport component')
  console.log(props)
  if (!props.msas) return null
  if (props.msas.length === 0) return null

  return (
    <div className="IRSReport">
      <header>
        <h2>Institution Register Summary</h2>
        <p className="usa-font-lead">Please review your summarized HMDA data below. If the data are incorrect, please update your file and select the "Update a new file" button. You will need to begin the filing process again.</p>
      </header>

      <div className="irs-table-wrapper" id="irs" >
        <table width="100%" summary="Your summarized HMDA data grouped by MSA/MD">
          <thead>
            <tr>
              <td colSpan={4}></td>
              <th scope="colgroup" id="loan-type" colSpan={4}>Loan Type</th>
              <th scope="colgroup" id="property-type" colSpan={3}>Property Type</th>
              <th scope="colgroup" id="loan-purpose" colSpan={3}>Loan Purpose</th>
            </tr>
            <tr>
              <th scope="col" id="msa-md">MSA/MD</th>
              <th scope="col" id="msa-md-name">MSA/MD Name</th>
              <th scope="col" id="total-lars">Total LARs</th>
              <th scope="col" id="total-amt">Total Amt. <span>(in thousands)</span></th>
              <th scope="col" id="conv">CONV</th>
              <th scope="col" id="fha">FHA</th>
              <th scope="col" id="va">VA</th>
              <th scope="col" id="fsa-rhs">FSA/RHS</th>
              <th scope="col" id="family">1-4 Family</th>
              <th scope="col" id="mfd">MFD</th>
              <th scope="col" id="multi-family">Multi-Family</th>
              <th scope="col" id="home-purchase">Home Purchase</th>
              <th scope="col" id="home-improvement">Home Improvement</th>
              <th scope="col" id="refinance">Refinance</th>
            </tr>
          </thead>
          <tfoot>
            <tr className="totals">
              <td className="center" colSpan={2}><strong>Total</strong></td>
              <td>{props.summary.lars.toLocaleString()}</td>
              <td>{props.summary.amount.toLocaleString()}</td>
              <td>{props.summary.conv.toLocaleString()}</td>
              <td>{props.summary.FHA.toLocaleString()}</td>
              <td>{props.summary.VA.toLocaleString()}</td>
              <td>{props.summary.FSA.toLocaleString()}</td>
              <td>{props.summary.oneToFourFamily.toLocaleString()}</td>
              <td>{props.summary.MFD.toLocaleString()}</td>
              <td>{props.summary.multiFamily.toLocaleString()}</td>
              <td>{props.summary.homePurchase.toLocaleString()}</td>
              <td>{props.summary.homeImprovement.toLocaleString()}</td>
              <td>{props.summary.refinance.toLocaleString()}</td>
            </tr>
          </tfoot>
          <tbody>
            {props.msas.map((msa, i) => {
              return <tr key={i}>
                <td headers="msa-md">{msa.id}</td>
                <td headers="msa-md-name">{msa.name}</td>
                <td headers="total-lars">{msa.totalLars.toLocaleString()}</td>
                <td headers="total-amt">{msa.totalAmount.toLocaleString()}</td>
                <td headers="loan-type conv">{msa.conv.toLocaleString()}</td>
                <td headers="loan-type fha">{msa.FHA.toLocaleString()}</td>
                <td headers="loan-type va">{msa.VA.toLocaleString()}</td>
                <td headers="loan-type fsa-rhs">{msa.FSA.toLocaleString()}</td>
                <td headers="property-type family">{msa.oneToFourFamily.toLocaleString()}</td>
                <td headers="property-type mfd">{msa.MFD.toLocaleString()}</td>
                <td headers="property-type multi-family">{msa.multiFamily.toLocaleString()}</td>
                <td headers="loan-purpose home-purchase">{msa.homePurchase.toLocaleString()}</td>
                <td headers="loan-purpose home-improvement">{msa.homeImprovement.toLocaleString()}</td>
                <td headers="loan-purpose refinance">{msa.refinance.toLocaleString()}</td>
              </tr>
            })}
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
  status: PropTypes.object,
  renderFooter: PropTypes.bool
}

export default IRSReport
