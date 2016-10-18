import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { fetchSubmission } from '../actions'
import UserHeading from '../components/UserHeading.jsx'
import UploadForm from './UploadForm.jsx'
import ValidationProgress from './ValidationProgress.jsx'
import Edits from './Edits.jsx'
import IRSReport from './IRSReport.jsx'
import Signature from './Signature.jsx'
import Summary from './Summary.jsx'
import RefileWarning from './RefileWarning.jsx'
/*
import EditsContainer from './EditsContainer.jsx'
*/

class SubmissionContainer extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.props.dispatch(fetchSubmission())
  }

  render() {
    console.log(this.props.params)
    let uploadForm = <UploadForm />
    let progress = null
    let refileWarning = null
    let editsContainer = null
    let summary = null
    let irs = null
    let sign = null

    const status = this.props.status
    const code = status.code
    console.log('current status code, from submission container', code)

    // status codes can be found at https://github.com/cfpb/hmda-platform/blob/master/Documents/submission-status.md
    if (code === -1) {
      return (
      <div className="SubmissionContainer">
        <p>{status.message}</p>
      </div>
      )
    }

    if (code > 1) progress = <ValidationProgress/>

    // render refileWarning for parsing and validation error status
    if (code === 5 || code === 8) refileWarning = <RefileWarning />

    if (code > 7 && code !== 5) {
      editsContainer = <Edits/>
      irs =  <IRSReport />
      sign = <Signature />
      summary = <Summary />
    }

    return (
    <div className="SubmissionContainer">
      <UserHeading period={this.props.params.filing} userName="Jane Smith" institution={this.props.params.institution} />
      <div className="usa-grid-full">
        <div className="usa-width-one-whole">
          {uploadForm}
          {progress}
        </div>
        <div className="usa-width-one-whole">
          {refileWarning}
          {editsContainer}
          {irs}
          {summary}
          {sign}
        </div>
      </div>
    </div>
    )
  }
}

function mapStateToProps(state) {
  const {
    isFetching,
    status,
    id
  } = state.app.submission || {
    isFetching: true,
    id: 1,
    status: {
      code: 1,
      message: ''
    }
  }

  return {
    isFetching,
    status,
    id
  }
}

SubmissionContainer.propTypes = {
  params: PropTypes.object,
  dispatch: PropTypes.func.isRequired
}

export default connect(mapStateToProps)(SubmissionContainer)
