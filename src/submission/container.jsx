/*eslint no-unused-vars: 0*/
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router'
import { connect } from 'react-redux'
import fetchInstitution from '../actions/fetchInstitution.js'
import UserHeading from './UserHeading.jsx'
import ReadyToSign from './ReadyToSign.jsx'
import UploadForm from './upload/container.jsx'
import ErrorWarning from '../common/ErrorWarning.jsx'
import EditsContainer from './edits/container.jsx'
import ReceiptContainer from './ReceiptContainer.jsx'
import EditsNavComponent from './Nav.jsx'
import NavButtonComponent from './NavButton.jsx'
import RefileWarningComponent from '../refileWarning/index.jsx'
import submissionProgressHOC from './progressHOC.jsx'
import IRSReport from './irs/index.jsx'
import Signature from './signature/container.jsx'
import Summary from './summary/container.jsx'
import ParseErrors from './parseErrors/container.jsx'
import Loading from '../common/Loading.jsx'
import { FAILED, PARSED_WITH_ERRORS, SIGNED } from '../constants/statusCodes.js'

import './container.css'
import './table.css'

const Edits = submissionProgressHOC(EditsContainer)
const EditsNav = submissionProgressHOC(EditsNavComponent)
const NavButton = submissionProgressHOC(NavButtonComponent)
const RefileWarning = submissionProgressHOC(RefileWarningComponent)

const renderByCode = (code, page, lei) => {
  const toRender = []
  if (code === FAILED) {
    toRender.push(<RefileWarning />)
    return toRender
  } else {
    if (page === 'upload') {
      toRender.push(<UploadForm />)
      if (code === PARSED_WITH_ERRORS) {
        toRender.push(<ParseErrors />)
      }
    } else if (
      ['syntacticalvalidity', 'quality', 'macro'].indexOf(page) !== -1
    ) {
      toRender.push(<Edits />)
    } else if (page === 'submission') {
      // at the top of the page
      if (code !== SIGNED) {
        toRender.push(<ReadyToSign />)
      }
      toRender.push(<ReceiptContainer />)
      toRender.push(<IRSReport lei={lei} />)
      toRender.push(<Summary />)

      // and just before the signature
      if (code !== SIGNED) {
        toRender.push(<ReadyToSign />)
      }
      toRender.push(<Signature />)
      toRender.push(<ReceiptContainer />)
    }
  }

  if (toRender.length === 0) {
    toRender.push(
      <p>
        Something is wrong.{' '}
        <Link to={window.HMDA_ENV.APP_SUFFIX + 'institutions'}>
          Return to institutions
        </Link>
        .
      </p>
    )
  }

  toRender.push(<NavButton />)

  return toRender
}

class SubmissionContainer extends Component {
  componentDidMount() {
    // for institution name in header
    const { lei } = this.props.params
    const { year } = this.props.params

    if (!this.props.institutions.institutions[lei]) {
      this.props.dispatch(fetchInstitution({ lei }, {year}, false))
    }
  }

  render() {
    if (!this.props.location) return null
    const { submission, params, location, institutions } = this.props
    const status = submission.status
    const code = status && status.code
    const page = location.pathname.split('/').slice(-1)[0]
    const institution = institutions.institutions[params.lei]

    const toRender = code
      ? renderByCode(code, page, this.props.lei)
      : [<Loading key="0" />]

    return (
      <div>
        <UserHeading
          period={params.filing}
          name={institution && institution.name ? institution.name : ''}
        />
        <EditsNav />
        <main id="main-content" className="SubmissionContainer usa-grid-full">
          {this.props.error && code !== FAILED ? (
            <ErrorWarning error={this.props.error} />
          ) : null}
          {toRender.map((component, i) => {
            return (
              <div className="usa-width-one-whole" key={i}>
                {component}
              </div>
            )
          })}
        </main>
      </div>
    )
  }
}

function mapStateToProps(state) {
  const { submission, institutions, lei, error } = state.app

  return {
    submission,
    institutions,
    lei,
    error
  }
}

SubmissionContainer.propTypes = {
  params: PropTypes.object,
  dispatch: PropTypes.func.isRequired
}

export default connect(mapStateToProps)(SubmissionContainer)
export { SubmissionContainer, mapStateToProps, renderByCode }
