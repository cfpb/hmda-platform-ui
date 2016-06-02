var React = require('react');
var EditsDetail = require('./EditsDetail.jsx');
var expandables = require('./react-expandables');

var EditsGrouped = React.createClass({
  propTypes: {
    group: React.PropTypes.array,
    groupByRow: React.PropTypes.bool
  },

  componentDidUpdate: function(){
    expandables.clearCache();
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
          return (
            <div className="EditsSummary expandable" key={i}>
              <button className="expandable_header expandable_target" title="Expand content">
                <span className="half summary expandable_label">
                  {self.getPrimary(groupObj)}
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
              <EditsDetail details={self.getSecondary(groupObj)}/>
            </div>
          )
        })}
      </div>
    )
  }
});

module.exports = EditsGrouped;
