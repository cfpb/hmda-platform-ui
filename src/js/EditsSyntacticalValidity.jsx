var React = require('react');

var EditsSyntacticalValidity = React.createClass({
  propTypes: {
    edits: React.PropTypes.array
  },
  render: function() {
    var _this = this;
    return (
      <div className="EditsSyntacticalValidity full" id={this.props.id}>
        <div className="tableHeader half">Loan Number</div>
        <div className="tableHeader half">Edits</div>
        {this.props.edits.map(function(loan, i) {
          return (
            <div className="EditsSummary" key={i}>
              <div className="half summary">{loan.loanNumber}</div>
              <div className="half summary">{loan.edits.length}</div>
              <div className="EditsDetails">
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
                    {loan.edits.map(function(edit, i) {
                      return (
                        <tr key={edit.id}>
                          <td>{edit.id}</td>
                          <td>{edit.desc}</td>
                          <td>{edit.field}</td>
                          <td>{edit.valueSubmitted}</td>
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

module.exports = EditsSyntacticalValidity;
