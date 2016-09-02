import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { fetchSignature } from '../actions'

class Signature extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    var self = this;
    if (this.props.checked) {
      this.props.dispatch(fetchSignature())
    }
  }

  toggleSignature() {
    // TODO - this.props.dispatch(postSignature())
  }

  showReceipt() {
    if(!this.props.receipt) return null;

    return (
      <div>
        <p className="receipt">Receipt #: {this.props.receipt}</p>
        <p className="timestamp">Timestamp: {this.props.timestamp}</p>
      </div>
    )
  }

  render() {
    return (
      <div className="Signature">
        <p><input type="checkbox" value="Signature" onChange={this.toggleSignature} checked={this.props.checked}/> I am an authorized representative of my institution with knowledge of the data submitted and can certify to the accuracy and completeness of the data submitted.</p>
        {this.showReceipt()}
      </div>
    )
  }
}

Signature.propTypes = {
  appStatus: React.PropTypes.object.isRequired,
  checked: React.PropTypes.bool
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

export default connect(mapStateToProps)(Signature)
