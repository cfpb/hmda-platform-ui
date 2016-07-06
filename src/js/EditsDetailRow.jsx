var React = require('react');
var api = require('./api');

var EditsDetailRow = React.createClass({

  propTypes: {
    detail: React.PropTypes.object.isRequired,
    label: React.PropTypes.string,
    id: React.PropTypes.number,
    appStatus: React.PropTypes.objectOf(React.PropTypes.func).isRequired
  },

  componentWillMount: function(){
    var verified = this.props.detail.verified
    this.setState({
      justification: this.props.detail.justification,
      verified: verified !== undefined ? verified : !!this.props.detail.justification
    });
  },

  makeTdContent: function(detail, field){
    if(field === 'justification'){
      if(this.state.verified) return this.state.justification;
      else return <textarea onChange={this.updateText} value={this.state.justification}/>
    }
    if(field === 'lar') return detail[field].loanId;
    if(field === 'verified') return this.makeCheck();
    return detail[field];
  },

  makeCheck: function(){
    var verified = this.state.verified;
    return <input type="checkbox" onChange={this.verify} checked={verified}/>
  },

  verify: function(e){
    var justification = this.state.justification;

    if(justification !== undefined && !justification) return e.preventDefault();

    var checked = e.target.checked;

    var edit = this.props.detail.edit || this.props.label;
    var data = {};

    if(this.props.detail.verified !== undefined) data.verified = checked;
    else data.justification = this.state.verified ? '' : this.state.justification

    api.putEdit(edit, data, this.props.appStatus.set)
    this.setState({verified: checked});
  },

  updateText: function(e){
    this.setState({justification: e.target.value});
  },

  render: function(){
    var self = this;
    var detail = this.props.detail;
    return <tr key={this.props.id}>
      {Object.keys(detail).map(function(field, i){
        return <td key={i}>{self.makeTdContent(detail, field)}</td>
      }
      )}
      {this.state.justification !== undefined ? <td>{self.makeCheck()}</td> : null}
    </tr>
  }
});

module.exports = EditsDetailRow;
