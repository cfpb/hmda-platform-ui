var React = require('react');
var superagent = require('superagent');

var EditsGrouped = require('./EditsGrouped.jsx');
var EditsMacro = require('./EditsMacro.jsx');
var EditsHeaderDescription = require('./EditsHeaderDescription.jsx');

var EditsContainer = React.createClass({
  getInitialState: function() {
    return {
      edits: {
        syntactical: {edits: []},
        validity: {edits: []},
        quality: {edits: []},
        macro: {edits: []}
      }
    }
  },

  parseResponse: function(err, res) {
    if (err) throw err;
    var response = JSON.parse(res.text);
    console.log(response);
    this.setState({
      'edits': response
    });
  },

  componentWillMount: function() {
    superagent.get('/api/institutions/placeholder/years/placeholder/submissions/placeholder/edits')
      .end(this.parseResponse);
  },

  render: function() {
    return (
      <div className="EditsContainer container">
        <div className="third">
          <p>Filing progress will go here. It could be in progress or complete or ...</p>
        </div>
        <div className="two-third">
          <EditsHeaderDescription>Syntactical</EditsHeaderDescription>
          <EditsGrouped id="syntactical" edits={this.state.edits.syntactical.edits} />

          <EditsHeaderDescription>Validity</EditsHeaderDescription>
          <EditsGrouped id="validity" edits={this.state.edits.validity.edits} />

          <EditsHeaderDescription>Quality</EditsHeaderDescription>
          <EditsGrouped id="quality" edits={this.state.edits.quality.edits} />

          <EditsHeaderDescription>Macro</EditsHeaderDescription>
          <EditsMacro id="macro" edits={this.state.edits.macro} />
        </div>
      </div>
    )
  }
});

module.exports = EditsContainer;
