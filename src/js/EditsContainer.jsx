var React = require('react');
var api = require('./api');
var EditsSelector = require('./EditsSelector.jsx');
var EditsGrouped = require('./EditsGrouped.jsx');
var EditsMacro = require('./EditsMacro.jsx');
var EditsHeaderDescription = require('./EditsHeaderDescription.jsx');

var EditsContainer = React.createClass({
  getInitialState: function(){
    return {
      syntactical: {edits: []},
      validity: {edits: []},
      quality: {edits: []},
      macro: {edits: []},
      lars: []
      groupByRow: false
    }
  },

  componentWillMount: function(){
    this.getEditsByGrouping();
  },

  getEditsByGrouping: function(){
    var self = this;
    var fn = self.state.groupByRow ? api.getEditsByRow : api.getEditsByType;
    fn(function(editObj){
      self.setState(editObj);
    });
  },

  updateGrouping: function(groupByRow){
    this.setState({groupByRow: groupByRow});
    if(groupByRow) this.populateLars();
    else this.populateEditTypes();
  },

  populateLars: function(){
    var larsObj = {};
    var lars = [];

    ['syntactical', 'validity', 'quality'].forEach(function(type){
      var edits = this.state[type].edits;

      edits.forEach(function(editWrapper){
        editWrapper.lars.forEach(function(larWrapper){
          var editObj = {edit: editWrapper.edit, type: type};
          if(type === 'quality') editObj.verification = larWrapper.verification;
          var id = larWrapper.lar.loanId
          larsObj[id] = larsObj[id] || {lar: larWrapper.lar, edits: []};
          larsObj[id].edits.push(editObj);
        });
      });
    });

    Object.keys(larsObj).forEach(function(lar){
      lars.push(larsObj[lar]);
    });

    this.setState({lars: lars});
  },

  populateEditTypes: function(){
    var edits = {
      syntactical: {type: 'syntactical', edits: []},
      validity: {type: 'validity', edits: []},
      quality: {type: 'quality', edits: []}
    };

    var editObj = {
      syntactical: {edits: {}},
      validity: {edits: {}},
      quality: {edits: {}}
    };

    this.state.lars.forEach(function(larWrapper){
      larWrapper.edits.forEach(function(editWrapper){
        var editList = editObj[editWrapper.type].edits;
        var currEdit = editList[editWrapper.edit];
        var larObj = {lar: larWrapper.lar}
        if(editWrapper.type === 'quality') larObj.verification = editWrapper.verification;

        editList[editWrapper.edit] = currEdit || {edit: editWrapper.edit, lars: []};
        currEdit.lars.push(larObj);
      });
    });

    Object.keys(editObj).forEach(function(type){
      Object.keys(editObj[type].edits).forEach(function(edit){
        edits[type].edits.push(edit);
      });
    });

    this.setState(edits);
  },

  renderByType: function(){
  
  },

  renderByRow: function(){
    
  },

  render: function(){
    return (
      <div className="EditsContainer two-third">
        <EditsSelector callback={this.updateGrouping}/>
        {this.renderEditsBody()}
      </div>
    )
  }
});

module.exports = EditsContainer;
