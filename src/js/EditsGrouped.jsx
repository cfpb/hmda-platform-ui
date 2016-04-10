var React = require('react');
var EditsDetail = require('./EditsDetail.jsx');

var EditsGrouped = React.createClass({
  propTypes: {
    edits: React.PropTypes.array
  },
  render: function() {
    return (
      <div className="EditsGrouped full edits" id={this.props.id}>
        <div className="table-header half">Loan Number</div>
        <div className="table-header half">Edits</div>
        {this.props.edits.map(function(loan, i) {
          return (
            <div className="EditsSummary" key={i}>
              <div className="half summary">{loan.loanNumber}</div>
              <div className="half summary">{loan.edits.length}</div>
              <EditsDetail edits={loan.edits} />
            </div>
          )
        })}
      </div>
    )
  }
});

module.exports = EditsGrouped;
