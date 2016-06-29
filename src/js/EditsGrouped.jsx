var React = require('react');
var EditsDetail = require('./EditsDetail.jsx');

var EditsGrouped = React.createClass({
  propTypes: {
    group: React.PropTypes.array,
    groupByRow: React.PropTypes.bool,
    appStatus: React.PropTypes.objectOf(React.PropTypes.func).isRequired
  },

  getLabel: function(details){
    return this.props.groupByRow ? details.lar.loanId : details.edit;
  },

  getSubGroup: function(details){
    return this.props.groupByRow ? details.edits: details.lars;
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
    if(!this.props.group.length) return (
        <div className="EditsGrouped">
          <h4 className="EditsGrouped"><span className="cf-icon cf-icon-approved"></span>No edits found</h4>
        </div>
      )
    return (
      <div className="EditsGrouped full edits expandable-group">
        {this.renderHeader()}
        {this.props.group.map(function(details, i) {
          var label = self.getLabel(details);
          return (
            <div className="EditsSummary expandable" key={i}>
              <button className="expandable_header expandable_target" title="Expand content">
                <span className="half summary expandable_label">
                  {label}
                </span>
                <span className="half summary expandable_link">
                  <span className="expandable_cue-open">
                      {self.getSubGroup(details).length}
                      <span className="cf-icon cf-icon-plus-round"></span>
                  </span>
                  <span className="expandable_cue-close">
                      {self.getSubGroup(details).length}
                      <span className="cf-icon cf-icon-minus-round"></span>
                  </span>
                </span>
              </button>
              <EditsDetail label={label} details={details} appStatus={self.props.appStatus}/>
            </div>
          )
        })}
      </div>
    )
  }
});

module.exports = EditsGrouped;
