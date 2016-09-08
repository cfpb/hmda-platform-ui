import React, { Component, PropTypes } from 'react'

export default class Signature extends Component {
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
        <p>
          <input type="checkbox" value="Signature"
            /*TODO: handle onChange=this.props.dispatch(postSignature())*/
            checked={this.props.isChecked} />
          I am an authorized representative of my institution with knowledge of the data submitted and can certify to the accuracy and completeness of the data submitted.
        </p>
        {this.showReceipt()}
      </div>
    )
  }
}

Signature.propTypes = {
  isChecked: React.PropTypes.bool,
  receipt: React.PropTypes.string,
  timestamp: React.PropTypes.string,
  dispatch: PropTypes.func.isRequired
}
