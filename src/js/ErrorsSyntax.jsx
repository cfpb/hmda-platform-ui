var React = require('react');

var ErrorSyntax = React.createClass({
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
    console.log(this.props.errors);
    return (
      <table width="100%">
        <thead>
          <tr>
            <th width="50%">Loan Number</th>
            <th width="50%">Errors</th>
          </tr>
        </thead>
        <tbody>
          {this.props.errors.map(this.createErrorRow)}
        </tbody>
      </table>
    )
  }
});

module.exports = ErrorSyntax;
