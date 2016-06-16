var React = require('react');
var api = require('./api');

var Signature = React.createClass({
  propTypes: {
    setAppStatus: React.PropTypes.func.isRequired,
    checked: React.PropTypes.bool
  },

  getInitialState: function(){
    return {
      receipt: null,
      timestamp: null
    }
  },

  componentWillMount: function(){
    if(this.props.checked) this.toggleSignature({target:{checked: true}});
  },

  toggleSignature: function(e){
    var self = this;
    api.postSignature(
      function(err, receiptObj){
        if(err) return this.props.setAppStatus({code: -1, message: err})
        self.setState({
          receipt: receiptObj.receipt,
          timestamp: receiptObj.timestamp
        });
        self.props.setAppStatus(null, receiptObj.status);
      },
      {
        signed: e.target.checked
      }
    );
  },

  showReceipt: function() {
    if(!this.state.receipt) return null;

    return (
      <div>
        <p className="receipt">Receipt #: {this.state.receipt}</p>
        <p className="timestamp">Timestamp: {this.state.timestamp}</p>
      </div>
    )
  },

  render: function() {
    return (
      <div className="Signature">
        <p><input type="checkbox" value="Signature" onChange={this.toggleSignature} checked={this.props.checked}/> I am an authorized representative of my institution with knowledge of the data submitted and can certify to the accuracy and completeness of the data submitted.</p>
        {this.showReceipt()}
      </div>
    )
  }
});

module.exports = Signature;
