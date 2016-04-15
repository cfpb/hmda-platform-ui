var React = require('react');
var EditsDetail = require('./EditsDetail.jsx');

var EditsGrouped = React.createClass({
  propTypes: {
    edits: React.PropTypes.array
  },
  render: function() {
    return (
      <div className="EditsGrouped full edits expandable-group" id={this.props.id}>
        <div className="">
          <div className="table-header half">Loan Number</div>
          <div className="table-header half">Edits</div>
        </div>
        {this.props.edits.map(function(loan, i) {
          return (
            <div className="EditsSummary expandable" id={'expand-' + loan.loanNumber + '-' + i} key={i}>
              <button className="expandable_header expandable_target" title="Expand content">
                <span className="half summary expandable_label">
                  {loan.loanNumber}
                </span>
                <span className="half summary expandable_link">
                  <span className="expandable_cue-open">
                      {loan.edits.length}
                      <span className="cf-icon cf-icon-plus-round"></span>
                  </span>
                  <span className="expandable_cue-close">
                      {loan.edits.length}
                      <span className="cf-icon cf-icon-minus-round"></span>
                  </span>
                </span>
              </button>
              <EditsDetail edits={loan.edits} expandID={'expand-' + loan.loanNumber + '-' + i}/>
            </div>
          )
        })}
      </div>
    )
  }
});

module.exports = EditsGrouped;
