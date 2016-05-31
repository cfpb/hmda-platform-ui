var React = require('react');
var EditsDetail = require('./EditsDetail.jsx');

var EditsGrouped = React.createClass({
  propTypes: {
    edits: React.PropTypes.array
  },

  componentDidMount: function() {
    jQuery('.expandable').each(function(i, v){
      v.expandable();
    });
  },

  render: function() {
    //console.log(this.props.edits);
    return (
      <div className="EditsGrouped full edits expandable-group">
        <div className="">
          <div className="table-header half">Edit</div>
          <div className="table-header half">Affected LARs</div>
        </div>
        {this.props.edits.map(function(edit, i) {
          return (
            <div className="EditsSummary expandable" key={i}>
              <button className="expandable_header expandable_target" title="Expand content">
                <span className="half summary expandable_label">
                  {edit.edit}
                </span>
                <span className="half summary expandable_link">
                  <span className="expandable_cue-open">
                      {edit.lars.length}
                      <span className="cf-icon cf-icon-plus-round"></span>
                  </span>
                  <span className="expandable_cue-close">
                      {edit.lars.length}
                      <span className="cf-icon cf-icon-minus-round"></span>
                  </span>
                </span>
              </button>
              <EditsDetail edits={edit.lars}/>
            </div>
          )
        })}
      </div>
    )
  }
});

module.exports = EditsGrouped;
