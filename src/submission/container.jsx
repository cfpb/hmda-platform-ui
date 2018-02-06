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
import submissionProgressHOC from './progressHOC.jsx'
import IRSReport from './irs/container.jsx'
import Signature from './signature/container.jsx'
import Summary from './summary/container.jsx'
import ParseErrors from './parseErrors/container.jsx'
import Loading from '../common/Loading.jsx'
import { FAILED, PARSED_WITH_ERRORS, SIGNED } from '../constants/statusCodes.js'

const Edits = submissionProgressHOC(EditsContainer)
const EditsNav = submissionProgressHOC(EditsNavComponent)
const NavButton = submissionProgressHOC(NavButtonComponent)

const renderByCode = (code, page, message) => {
  const toRender = []
  if (code === FAILED) {
    toRender.push(<p>{message}</p>)
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
      toRender.push(<IRSReport />)
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
        <Link to="/institutions">Return to institutions</Link>.
      </p>
    )
  }

  toRender.push(<NavButton />)

  return toRender
}

class SubmissionContainer extends Component {
  componentDidMount() {
    // for institution name in header
    const id = this.props.params.institution

    if (!this.props.institutions.institutions[id]) {
      this.props.dispatch(fetchInstitution({ id: id }, false))
    }
  }

  render() {
    if (!this.props.location) return null
    const { submission, params, location, institutions } = this.props
    const status = submission.status
    const code = status && status.code
    const page = location.pathname.split('/').slice(-1)[0]
    const institution = institutions.institutions[params.institution]

    const toRender = code
      ? renderByCode(code, page, status.message)
      : [<Loading key="0" />]

    return (
      <div>
        <UserHeading
          period={params.filing}
          name={institution && institution.name ? institution.name : ''}
        />
        <EditsNav />
        <main id="main-content" className="usa-grid SubmissionContainer">
          {this.props.error ? <ErrorWarning error={this.props.error} /> : null}
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
  const { submission, institutions, institutionId, error } = state.app

  return {
    submission,
    institutions,
    institutionId,
    error
  }
}

function mapDispatchToProps(dispatch) {
  return { dispatch }
}

SubmissionContainer.propTypes = {
  params: PropTypes.object,
  dispatch: PropTypes.func.isRequired
}

export default connect(mapStateToProps, mapDispatchToProps)(SubmissionContainer)
export { SubmissionContainer, mapStateToProps, mapDispatchToProps }
