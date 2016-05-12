var React = require('react');
var api = require('./api');
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

  componentWillMount: function() {
    var self = this;
    api.getEdits(function(editObj){
      self.setState({
        edits: editObj
      });
    });
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
