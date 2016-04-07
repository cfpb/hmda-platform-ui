var React = require('react');
var EditsDetail = require('./EditsDetail.jsx');

var EditsMacro = React.createClass({
  propTypes: {
    edits: React.PropTypes.object
  },
  render: function() {
    return (
      <div className="EditsMacro full edits" id={this.props.id}>
        <EditsDetail edits={this.props.edits.edits} />
      </div>
    )
  }
});

module.exports = EditsMacro;
