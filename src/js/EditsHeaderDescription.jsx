var React = require('react');

var EditsHeaderDescription = React.createClass({
  getDescription: function(editType) {
    var desc = null;
    switch (editType) {
      case 'Syntactical':
        desc = 'This is the syntactical description.'
        break;
      case 'Validity':
        desc = 'This is the validity description.'
        break;
      case 'Quality':
        desc = 'This is the quality description.'
        break;
      case 'Macro':
        desc = 'This is the macro description.'
        break;
      default:
        throw new Error('Unexpected edit type. Unable to create edit description');
    }

    return desc
  },
  render: function() {
    return (
      <div className="EditsHeaderDescription">
        <h2>{this.props.children} Edits</h2>
        <p>{this.getDescription(this.props.children)}</p>
      </div>
    )
  }
});

module.exports = EditsHeaderDescription;
