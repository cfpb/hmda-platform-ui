var React = require('react');
var EditsDetail = require('./EditsDetail.jsx');

var EditsMacro = React.createClass({
  propTypes: {
    group: React.PropTypes.array,
    appStatus: React.PropTypes.object
  },
  render: function() {
    return (
      <div className="EditsMacro full edits">
        <EditsDetail details={this.props.group} appStatus={this.props.appStatus}/>
      </div>
    )
  }
});

module.exports = EditsMacro;
