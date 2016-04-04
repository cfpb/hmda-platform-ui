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
        <td>
          <table>
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
      <div className="ErrorsSyntax full">
        <div className="tableHeader half">Loan Number</div>
        <div className="tableHeader half">Errors</div>
        {this.props.errors.map(function(loan, i) {
          return (
            <div>
              <div className="half">{loan.loanNumber}</div>
              <div className="half">{loan.errors.length}</div>
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
                  {loan.errors.map(function(error, i) {
                    return (
                      <tr key={error.id}>
                        <td>{error.id}</td>
                        <td>{error.desc}</td>
                        <td>{error.field}</td>
                        <td>{error.valueSubmitted}</td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          )
        })}
      </div>
    )
  }
});

module.exports = ErrorSyntax;
