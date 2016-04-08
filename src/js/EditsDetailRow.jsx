var React = require('react');

var EditsDetailRow = React.createClass({
  getInitialState: function(){
    return {verified: false, justification: ''}
  },

  componentWillMount: function(){
    this.setState({
      verified: this.props.edit.verified,
      justification: this.props.edit.justification
    });
  },

  makeTdContent: function(edit, field){
    if(field === 'justification'){
      if(this.state.verified) return this.state.justification;
      else return <textarea onChange={this.updateText}value={this.state.justification}/>
    }
    if(field === 'verified') return <input type="checkbox" onChange={this.toggleText} checked={this.state.verified}/>
    return edit[field];
  },

  toggleText: function(e){
    var checked = e.target.checked;
    this.setState({verified: checked})
  },

  updateText: function(e){
    this.setState({justification: e.target.value});
  },


  render: function(){
    var _this = this;
    var edit = this.props.edit;
    return <tr key={this.props.key}>
      {Object.keys(edit).map(function(field, i){
        return <td key={i}>{_this.makeTdContent(edit, field)}</td>
      })}
    </tr>
  }
});

module.exports = EditsDetailRow;

