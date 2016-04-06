var React = require('react');
var EditsSyntacticalValidityDetail = require('./EditsSyntacticalValidityDetail.jsx');

var EditsSyntacticalValidity = React.createClass({
  propTypes: {
    edits: React.PropTypes.array
  },
  render: function() {
    var _this = this;
    return (
      <div className="EditsSyntacticalValidity full edits" id={this.props.id}>
        <div className="table-header half">Loan Number</div>
        <div className="table-header half">Edits</div>
        {this.props.edits.map(function(loan, i) {
          return (
            <div className="EditsSummary" key={i}>
              <div className="half summary">{loan.loanNumber}</div>
              <div className="half summary">{loan.edits.length}</div>
              <EditsSyntacticalValidityDetail edits={loan.edits} />
            </div>
          )
        })}
      </div>
    )
  }
});

module.exports = EditsSyntacticalValidity;
