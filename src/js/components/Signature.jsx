import React, { Component, PropTypes } from 'react'

export default class Signature extends Component {
  showReceipt() {
    console.log('signature component - showReceipt')
    console.log(this.props)
    if(!this.props.receipt) return null;

    return (
      <div>
        <p className="receipt">Receipt #: {this.props.receipt}</p>
        <p className="timestamp">Timestamp: {this.props.timestamp}</p>
      </div>
    )
  }

  toggleSignature(e) {
    console.log('signature component - toggleSignature')
    console.log(this.props)
    this.props.onSignatureClick(e.target.checked)
  }

  render() {
    console.log('signature component - render')
    console.log(this.props)
    return (
      <div className="Signature">
        <p>
          <input type="checkbox" value="Signature"
            onChange={this.toggleSignature.bind(this)}
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
  onSignatureClick: PropTypes.func.isRequired
}
