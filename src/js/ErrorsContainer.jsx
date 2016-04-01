var React = require('react');

var ErrorsContainer = React.createClass({
  render: function() {
    return (
      <div className="container">
        <div className="half">
          <p>Filing progress will go here. It could be in progress or complete or ...</p>
        </div>
        <div className="half">
          <p>This is where the edit screens will go. Syntax, validity, quality, etc.</p>
        </div>
      </div>
    )
  }
});

module.exports = ErrorsContainer;
