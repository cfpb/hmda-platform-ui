var React = require('react');

var EditsHeaderDescription = React.createClass({
  propTypes: {
    children: React.PropTypes.string.isRequired
  },
  getDescription: function(editType) {
    var desc = null;
    switch (editType) {
      case 'Loan Application Records':
        desc = 'This is the LAR description'
        break;
      case 'Syntactical Edits':
        desc = 'This is the syntactical description.'
        break;
      case 'Validity Edits':
        desc = 'This is the validity description.'
        break;
      case 'Quality Edits':
        desc = 'This is the quality description.'
        break;
      case 'Macro Edits':
        desc = 'This is the macro description.'
        break;
      case 'Q595 Edits':
        desc = 'MSA/MD not on respondent panel.'
        break;
      default:
        throw new Error('Unexpected edit type. Unable to create edit description');
    }

    return desc
  },
  render: function() {
    return (
      <div className="EditsHeaderDescription">
        <h2>{this.props.children}</h2>
        <p>{this.getDescription(this.props.children)}</p>
      </div>
    )
  }
});

module.exports = EditsHeaderDescription;
