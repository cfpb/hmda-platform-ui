var React = require('react');
var EditsDetail = require('./EditsDetail.jsx');

var EditsMacro = React.createClass({
  propTypes: {
    group: React.PropTypes.array,
    setAppStatus: React.PropTypes.func
  },
  render: function() {
    return (
      <div className="EditsMacro full edits">
        <EditsDetail details={this.props.group} setAppStatus={this.props.setAppStatus}/>
      </div>
    )
  }
});

module.exports = EditsMacro;
