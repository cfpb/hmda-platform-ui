var React = require('react');
var EditsDetail = require('./EditsDetail.jsx');

var EditsQ029 = React.createClass({
  propTypes: {
    group: React.PropTypes.array
  },
  render: function() {
    return (
      <div className="EditsQ029 full edits">
        <EditsDetail details={this.props.group}/>
      </div>
    )
  }
});

module.exports = EditsQ029;
