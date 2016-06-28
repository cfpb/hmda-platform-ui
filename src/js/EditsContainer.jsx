var React = require('react');
var api = require('./api');
var expandables = require('./react-expandables');
var EditsSelector = require('./EditsSelector.jsx');
var EditsGrouped = require('./EditsGrouped.jsx');
var EditsMacro = require('./EditsMacro.jsx');
var EditsQ029 = require('./EditsQ029.jsx');
var EditsQ595 = require('./EditsQ595.jsx');
var EditsHeaderDescription = require('./EditsHeaderDescription.jsx');

var EditsContainer = React.createClass({
  getInitialState: function(){
    return {
      syntactical: {edits: []},
      validity: {edits: []},
      quality: {edits: []},
      macro: {edits: []},
      q029: {edits: []},
      q595: {edits: []},
      lars: [],
      groupByRow: false
    }
  },

  propTypes: {
    appStatus: React.PropTypes.object
  },

  componentWillMount: function(){
    this.getEditsByGrouping();
  },

  componentDidMount: function(){
    expandables.init();
  },

  componentDidUpdate: function(){
    expandables.update();
  },

  getEditsByGrouping: function(){
    var self = this;
    var fn = self.state.groupByRow ? api.getEditsByRow : api.getEditsByType;
    fn(function(err, editObj){
      if(err) return console.log(err);
      self.setState(editObj);
    });
  },

  updateGrouping: function(groupByRow){
    if(this.state.groupByRow === groupByRow) return;
    this.setState({groupByRow: groupByRow});
    if(groupByRow) this.populateLars();
    else this.populateEditTypes();
  },

  populateLars: function(){
    var larsObj = {};
    var lars = [];
    var self = this;

    ['syntactical', 'validity', 'quality'].forEach(function(type){
      var edits = self.state[type].edits;

      edits.forEach(function(editWrapper){
        editWrapper.lars.forEach(function(larWrapper){
          var editObj = {edit: editWrapper.edit, type: type};
          var id = larWrapper.lar.loanId
          larsObj[id] = larsObj[id] || {lar: larWrapper.lar, edits: []};
          larsObj[id].edits.push(editObj);
        });
      });
    });

    Object.keys(larsObj).forEach(function(lar){
      lars.push(larsObj[lar]);
    });

    self.setState({lars: lars});
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

    var self = this;

    this.state.lars.forEach(function(larWrapper){
      larWrapper.edits.forEach(function(editWrapper){
        var editList = editObj[editWrapper.type].edits;
        var larObj = {lar: larWrapper.lar}

        editList[editWrapper.edit] = editList[editWrapper.edit] || {edit: editWrapper.edit, lars: []};
        editList[editWrapper.edit].lars.push(larObj);
      });
    });

    Object.keys(editObj).forEach(function(type){
      Object.keys(editObj[type].edits).forEach(function(edit){
        if(type === 'quality') self.reverify(editObj[type].edits[edit]);
        edits[type].edits.push(editObj[type].edits[edit]);
      });
    });

    this.setState(edits);
  },

  reverify: function(editObj){
    var label = editObj.edit;
    var edits = this.state.quality.edits;

    for(var i=0; i<edits.length; i++){
      var edit = edits[i];
      if(edit.edit === label) return editObj.verified = edit.verified;
    }
  },

  renderByType: function(){
    return (
      <div className="EditsContainerBody">
        <EditsHeaderDescription>Syntactical Edits</EditsHeaderDescription>
        <EditsGrouped group={this.state.syntactical.edits} groupByRow={this.state.groupByRow} appStatus={this.props.appStatus}/>

        <EditsHeaderDescription>Validity Edits</EditsHeaderDescription>
        <EditsGrouped group={this.state.validity.edits} groupByRow={this.state.groupByRow} appStatus={this.props.appStatus}/>

        <EditsHeaderDescription>Quality Edits</EditsHeaderDescription>
        <EditsGrouped group={this.state.quality.edits} groupByRow={this.state.groupByRow} appStatus={this.props.appStatus}/>

        <EditsHeaderDescription>Macro Edits</EditsHeaderDescription>
        <EditsMacro edits={this.state.macro} appStatus={this.props.appStatus}/>

        <EditsHeaderDescription>Q029 Edits</EditsHeaderDescription>
        <EditsQ029 group={this.state.q029.edits}/>

        <EditsHeaderDescription>Q595 Edits</EditsHeaderDescription>
        <EditsQ595 group={this.state.q595.edits}/>
      </div>
    )
  },

  renderByRow: function(){
    return (
      <div className="EditsContainerBody">
        <EditsHeaderDescription>Loan Application Records</EditsHeaderDescription>
        <EditsGrouped group={this.state.lars} groupByRow={this.state.groupByRow} appStatus={this.props.appStatus}/>

        <EditsHeaderDescription>Macro Edits</EditsHeaderDescription>
        <EditsMacro edits={this.state.macro} appStatus={this.props.appStatus}/>

        <EditsHeaderDescription>Q029 Edits</EditsHeaderDescription>
        <EditsQ029 group={this.state.q029.edits}/>

        <EditsHeaderDescription>Q595 Edits</EditsHeaderDescription>
        <EditsQ595 group={this.state.q595.edits}/>
      </div>
    )
  },

  render: function(){
    return (
      <div className="EditsContainer">
        <EditsSelector updateGrouping={this.updateGrouping}/>
        {this.state.groupByRow ? this.renderByRow() : this.renderByType()}
      </div>
    )
  }
});

module.exports = EditsContainer;
