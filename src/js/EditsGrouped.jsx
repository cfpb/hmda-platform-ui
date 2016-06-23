var React = require('react');
var EditsDetail = require('./EditsDetail.jsx');

var EditsGrouped = React.createClass({
  propTypes: {
    group: React.PropTypes.array,
    groupByRow: React.PropTypes.bool,
    setAppStatus: React.PropTypes.func,
    type: React.PropTypes.string
  },

  getPrimary: function(groupObj){
    return this.props.groupByRow ? groupObj.lar.loanId : groupObj.edit;
  },

  getSecondary: function(groupObj){
    return this.props.groupByRow ? groupObj.edits: groupObj.lars;
  },

  renderHeader: function(){
    var firstCol = this.props.groupByRow ? 'Loan ID' : 'Edit';
    var secondCol = this.props.groupByRow ? 'Edits': 'Affected LARs';
    return (
      <div className="EditsGroupedHeader">
        <div className="table-header half">{firstCol}</div>
        <div className="table-header half">{secondCol}</div>
      </div>
    )
  },

  render: function(){
    var self = this;
    return (
      <div className="EditsGrouped full edits expandable-group">
        {this.renderHeader()}
        {this.props.group.map(function(groupObj, i) {
          var primary = self.getPrimary(groupObj);
          return (
            <div className="EditsSummary expandable" key={i}>
              <button className="expandable_header expandable_target" title="Expand content">
                <span className="half summary expandable_label">
                  {primary}
                </span>
                <span className="half summary expandable_link">
                  <span className="expandable_cue-open">
                      {self.getSecondary(groupObj).length}
                      <span className="cf-icon cf-icon-plus-round"></span>
                  </span>
                  <span className="expandable_cue-close">
                      {self.getSecondary(groupObj).length}
                      <span className="cf-icon cf-icon-minus-round"></span>
                  </span>
                </span>
              </button>
              <EditsDetail primary={primary} details={self.getSecondary(groupObj)} setAppStatus={self.props.setAppStatus} type={self.props.type}/>
            </div>
          )
        })}
      </div>
    )
  }
});

module.exports = EditsGrouped;
