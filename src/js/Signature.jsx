var React = require('react');

var Signature = React.createClass({
  propTypes: {
    checked: React.PropTypes.string,
    clicked: React.PropTypes.func.isRequired,
    receipt: React.PropTypes.string,
    timestamp: React.PropTypes.number
  },

  showReceipt: function(receipt, timestamp) {
    if(receipt){
      return (
        <div>
          <p>Receipt #: {receipt}</p>
          <p>Timestamp: {timestamp}</p>
        </div>
      )
    }
  },

  render: function() {
    var self = this;
    return (
      <div className="Signature">
        <p><input type="checkbox" value="IRS verification" onChange={self.props.clicked} checked={self.props.checked}/> I am an authorized representative of my institution with knowledge of the data submitted and can certify to the accuracy and completeness of the data submitted.</p>
        {self.showReceipt(self.props.receipt, self.props.timestamp)}
      </div>
    )
  }
});

module.exports = Signature;