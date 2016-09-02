import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { fetchSubmission } from '../actions'
import UploadForm from './UploadForm.jsx'
import ValidationProgress from './ValidationProgress.jsx'
import Edits from './Edits.jsx'
import Signature from '../components/Signature.jsx'
import IRSReport from '../components/IRSReport.jsx'
/*import RefileWarning from './RefileWarning.jsx'
import EditsContainer from './EditsContainer.jsx'
import IRSReport from './IRSReport.jsx'
import Summary from './Summary.jsx'

*/
class SubmissionContainer extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.props.dispatch(fetchSubmission())
  }

  render() {
    let uploadForm = <UploadForm submission={this.props.submission}/>
    let progress = null
    let refileWarning = null
    let editsContainer = null
    let summary = null
    let irs = null
    let sign = null

    const status = this.props.submission.status
    const code = status.code

    if (code === -1) {
      return (
      <div className="SubmissionContainer">
        <p>{status.message}</p>
      </div>
      )
    }

    if (code > 2) progress = <ValidationProgress/>

    if(code > 6){
      editsContainer = <Edits/>
      sign = <Signature checked={false} />
      irs = <IRSReport checked={false} />
    }
/*
    if(code > 9) irs = <IRSReport checked={false}/>

    if(code > 10){
      summary = <Summary/> // TODO: will have a prop added
      irs = <IRSReport checked={true}/>
      sign = <Signature checked={false}/>
    }

    if(code > 12){
      sign = <Signature checked={true}/>
    }
*/
    return (
    <div className="SubmissionContainer container">
      {uploadForm}
      <div className="third">
        {progress}
      </div>
      <div className="two-third">
        {refileWarning}
        {editsContainer}
        {irs}
        {summary}
        {sign}
      </div>
    </div>
    )
  }
}

function mapStateToProps(state) {
  const {
    isFetching,
    submission
  } = state.app.submission || {
    isFetching: true,
    submission: {
      id: 1,
      status: {
        code: 1,
        message: ''
      }
    }
  }

  return {
    isFetching,
    submission
  }
}

SubmissionContainer.propTypes = {
  params: PropTypes.object,
  dispatch: PropTypes.func.isRequired
}

export default connect(mapStateToProps)(SubmissionContainer)
