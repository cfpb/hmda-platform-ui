var React = require('react');

var ErrorSyntax = React.createClass({
  propTypes: {
    errors: React.PropTypes.array
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
            <div className="ErrorsSummary">
              <div className="half summary">{loan.loanNumber}</div>
              <div className="half summary">{loan.errors.length}</div>
              <div className="ErrorsDetails">
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
            </div>
          )
        })}
      </div>
    )
  }
});

module.exports = ErrorSyntax;
