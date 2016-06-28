var React = require('react');
var EditsDetail = require('./EditsDetail.jsx');

var EditsMacro = React.createClass({
  propTypes: {
    edits: React.PropTypes.object,
    appStatus: React.PropTypes.object
  },
  render: function() {
    return (
      <div className="EditsMacro full edits">
        <EditsDetail details={this.props.edits} appStatus={this.props.appStatus}/>
      </div>
    )
  }
});

module.exports = EditsMacro;
