import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router'
import { connect } from 'react-redux'
import fetchSubmission from '../actions/fetchSubmission.js'
import fetchInstitution from '../actions/fetchInstitution.js'
import setFilename from '../actions/setFilename.js'
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
import {
  CREATED,
  UNINITIALIZED,
  FAILED,
  PARSED_WITH_ERRORS,
  VALIDATING,
  SIGNED
} from '../constants/statusCodes.js'

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
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    // for institution name in header
    const institution = {
      id: this.props.params.institution
    }
    const status = this.props.submission.status

    if (
      !this.props.institution.id ||
      this.props.institution.id !== institution.id
    ) {
      this.props.dispatch(fetchInstitution(institution, false))
    }

    if (institution.id && status.code > CREATED) {
      const filename = localStorage.getItem(`HMDA_FILENAME/${institution.id}`)
      if (filename) this.props.dispatch(setFilename(filename, institution.id))
    }
  }

  render() {
    if (!this.props.location) return null

    const { submission, params, location } = this.props
    const status = submission.status
    const code = status && status.code
    const page = location.pathname.split('/').slice(-1)[0]

    const toRender = code
      ? renderByCode(code, page, status.message)
      : [<Loading key="0" />]

    return (
      <div>
        <UserHeading
          period={params.filing}
          institution={this.props.institution}
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
  const submission = state.app.submission
  const institution = state.app.institution
  const error = state.app.error

  return {
    submission,
    institution,
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
