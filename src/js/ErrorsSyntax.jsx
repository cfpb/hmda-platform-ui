var React = require('react');

var ErrorSyntaxValidity = React.createClass({
  propTypes: {
    errors: React.PropTypes.array
  },
  createErrorRow: function(error) {
    return (
      <tr key={error.loanNumber}>
        <td>{error.loanNumber}</td>
        <td>{error.errors.length}</td>
      </tr>
    )
  },
  render: function(){
    return (
      <table>
        <thead>
          <tr>
            <th>Loan Number</th>
            <th>Errors</th>
          </tr>
        </thead>
        <tbody>
          {this.props.errors.map(this.createErrorRow)}
        </tbody>
      </table>
    )
  }
});

module.exports = ErrorSyntaxValidity;
