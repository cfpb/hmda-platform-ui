var React = require('react');

var Signature = React.createClass({
  propTypes: {
    checked: React.PropTypes.string,
    clicked: React.PropTypes.func.isRequired
  },

  render: function() {
    var self = this;
    return (
      <div className="Signature">
        <p><input type="checkbox" value="IRS verification" onChange={self.props.clicked} checked={self.props.checked}/> I am an authorized representative of my institution with knowledge of the data submitted and can certify to the accuracy and completeness of the data submitted.</p>
      </div>
    )
  }
});

module.exports = Signature;