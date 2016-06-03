var React = require('react');
var EditsDetail = require('./EditsDetail.jsx');

var EditsMacro = React.createClass({
  propTypes: {
    group: React.PropTypes.array
  },
  render: function() {
    return (
      <div className="EditsMacro full edits">
        <EditsDetail details={this.props.group}/>
      </div>
    )
  }
});

module.exports = EditsMacro;
