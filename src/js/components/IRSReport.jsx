import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Pagination from '../containers/Pagination.jsx'
import LoadingIcon from './LoadingIcon.jsx'
import Alert from './Alert.jsx'

const renderTotals = props => {
  if (props.renderTotals)
    return (
      <tfoot>
        <tr className="totals">
          <td className="center" colSpan={2}>
            <strong>Total</strong>
          </td>
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
    )

  return null
}

const renderDownloadLink = props => {
  if (props.msas.length === 0) return null

  const { institutionId, period, sequenceNumber } = props.id
  return (
    <p>
      <a
        href="#"
        onClick={e => {
          e.preventDefault()
          props.onDownloadClick(institutionId, period, sequenceNumber)
        }}
      >
        Download IRS report
      </a>
    </p>
  )
}

const renderTable = props => {
  let tableClass = 'irs-table-wrapper PaginationTarget'
  tableClass += props.paginationFade ? ' fadeOut' : ''
  return (
    <div className={tableClass} id="irs">
      <table width="100%" summary="Your summarized HMDA data grouped by MSA/MD">
        <thead>
          <tr>
            <td colSpan={4} />
            <th scope="colgroup" id="loan-type" colSpan={4}>
              Loan Type
            </th>
            <th scope="colgroup" id="property-type" colSpan={3}>
              Property Type
            </th>
            <th scope="colgroup" id="loan-purpose" colSpan={3}>
              Loan Purpose
            </th>
          </tr>
          <tr>
            <th scope="col" id="msa-md">
              MSA/MD
            </th>
            <th scope="col" id="msa-md-name">
              MSA/MD Name
            </th>
            <th scope="col" id="total-lars">
              Total LARs
            </th>
            <th scope="col" id="total-amt">
              Total Amt. <span>(in thousands)</span>
            </th>
            <th scope="col" id="conv">
              CONV
            </th>
            <th scope="col" id="fha">
              FHA
            </th>
            <th scope="col" id="va">
              VA
            </th>
            <th scope="col" id="fsa-rhs">
              FSA/RHS
            </th>
            <th scope="col" id="family">
              1-4 Family
            </th>
            <th scope="col" id="mfd">
              MFD
            </th>
            <th scope="col" id="multi-family">
              Multi-Family
            </th>
            <th scope="col" id="home-purchase">
              Home Purchase
            </th>
            <th scope="col" id="home-improvement">
              Home Improvement
            </th>
            <th scope="col" id="refinance">
              Refinance
            </th>
          </tr>
        </thead>
        {renderTotals(props)}
        <tbody>
          {props.msas.map((msa, i) => {
            return (
              <tr key={i}>
                <td headers="msa-md">{msa.id}</td>
                <td headers="msa-md-name">{msa.name}</td>
                <td headers="total-lars">{msa.totalLars.toLocaleString()}</td>
                <td headers="total-amt">{msa.totalAmount.toLocaleString()}</td>
                <td headers="loan-type conv">{msa.conv.toLocaleString()}</td>
                <td headers="loan-type fha">{msa.FHA.toLocaleString()}</td>
                <td headers="loan-type va">{msa.VA.toLocaleString()}</td>
                <td headers="loan-type fsa-rhs">{msa.FSA.toLocaleString()}</td>
                <td headers="property-type family">
                  {msa.oneToFourFamily.toLocaleString()}
                </td>
                <td headers="property-type mfd">{msa.MFD.toLocaleString()}</td>
                <td headers="property-type multi-family">
                  {msa.multiFamily.toLocaleString()}
                </td>
                <td headers="loan-purpose home-purchase">
                  {msa.homePurchase.toLocaleString()}
                </td>
                <td headers="loan-purpose home-improvement">
                  {msa.homeImprovement.toLocaleString()}
                </td>
                <td headers="loan-purpose refinance">
                  {msa.refinance.toLocaleString()}
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

const renderErrorMessage = () => {
  return (
    <Alert type="error">
      <p>
        The IRS report could not be returned at this time. If this problem
        continues please contact{' '}
        <a href="mailto:hmdahelp@cfpb.gov">HMDA help</a>.<br /> You can still
        sign your submission.
      </p>
    </Alert>
  )
}

const IRSReport = props => {
  if (props.isFetching && !props.paginationFade) return <LoadingIcon />
  if (!props.msas) return null
  // sometimes the back-end returns an empty array for the, "msas":[]
  const renderResponse =
    props.msas.length === 0 ? renderErrorMessage() : renderTable(props)

  return (
    <section className="IRSReport">
      <header>
        <h2>Institution Register Summary</h2>
        <p className="usa-font-lead">
          Please review your Institution Register Summary below. If you discover
          an error in your IRS, please update your file and select the
          &quot;Update a new file&quot; button.
        </p>
        {renderDownloadLink(props)}
      </header>
      {renderResponse}
      <Pagination isFetching={props.isFetching} target="irs" />
      <hr />
    </section>
  )
}

IRSReport.propTypes = {
  msas: PropTypes.array,
  summary: PropTypes.object,
  id: PropTypes.object,
  renderTotals: PropTypes.bool,
  onDownloadClick: PropTypes.func,
  isFetching: PropTypes.bool,
  pagination: PropTypes.object,
  paginationFade: PropTypes.number
}

export default IRSReport
