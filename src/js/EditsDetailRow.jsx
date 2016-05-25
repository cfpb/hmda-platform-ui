var React = require('react');

var EditsDetailRow = React.createClass({

  propTypes: {
    edit: React.PropTypes.object.isRequired,
    id: React.PropTypes.number
  },

  getInitialState: function(){
    return {verification: null};
  },

  componentWillMount: function(){
    this.setState({
      verification: this.props.edit.verification
    });
  },

  makeTdContent: function(edit, field){
    if(field === 'verification'){
      if(this.state.verification) return this.state.verification;
      else return <textarea onChange={this.updateText}value={this.state.verification}/>
    }
    if(field === 'lar') return JSON.stringify(edit[field]);
    return edit[field];
  },

  makeCheck: function(){
    if(this.state.verification !== null){
      return <td><input type="checkbox" onChange={this.toggleText} checked={!!this.state.verification}/></td>
    }
  },

  toggleText: function(e){
    var checked = e.target.checked;
    this.setState({verified: checked})
  },

  updateText: function(e){
    this.setState({verification: e.target.value});
  },


  render: function(){
    var self = this;
    var edit = this.props.edit;
    return <tr key={this.props.id}>
      {Object.keys(edit).map(function(field, i){
        return <td key={i}>{self.makeTdContent(edit, field)}</td>
      }
      )}
      {self.makeCheck()}
    </tr>
  }
});

module.exports = EditsDetailRow;

