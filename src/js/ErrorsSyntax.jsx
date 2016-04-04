var React = require('react');

var ErrorSyntax = React.createClass({
  propTypes: {
    errors: React.PropTypes.array
  },
  createErrorRow: function(loan) {
    return (
      <tr key={loan.loanNumber}>
        <td>{loan.loanNumber}</td>
        <td>{loan.errors.length}</td>
      </tr>
    )
  },
  createErrorDetailRow: function(error) {
    return (
      <tr key={error.id}>
        <td colSpan="3">
          <table width="100%">
            <thead>
              <tr>
                <th>Edit ID</th>
                <th>Description</th>
                <th>Field</th>
                <th>Submitted Value</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{error.id}</td>
                <td>{error.desc}</td>
                <td>{error.field}</td>
                <td>{error.valueSubmitted}</td>
              </tr>
            </tbody>
          </table>
        </td>
      </tr>
    )
  },
  render: function() {
    console.log(this.props.errors);
    var _this = this;
    return (
      <table width="100%">
        <thead>
          <tr>
            <th width="50%">Loan Number</th>
            <th width="50%">Errors</th>
          </tr>
        </thead>
        <tbody>
        {this.props.errors.map(function(loan, i) {
          var rows = [];
          rows.push(_this.createErrorRow(loan));
          loan.errors.map(function(error, i) {
            rows.push(_this.createErrorDetailRow(error));
          })
          return rows
        })}
        </tbody>
      </table>
    )
  }
});

module.exports = ErrorSyntax;
