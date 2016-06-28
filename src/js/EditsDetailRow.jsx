var React = require('react');
var api = require('./api');

var EditsDetailRow = React.createClass({

  propTypes: {
    detail: React.PropTypes.object.isRequired,
    primary: React.PropTypes.string,
    id: React.PropTypes.number,
    appStatus: React.PropTypes.objectOf(React.PropTypes.func).isRequired
  },

  defaultProps: {
    appStatus: {get: function(){}, set: function(){}}
  },

  componentWillMount: function(){
    var verified = this.props.detail.verified
    this.setState({
      verification: this.props.detail.verification,
      verified: verified !== undefined ? verified : !!this.props.detail.verification
    });
  },

  makeTdContent: function(detail, field){
    if(field === 'verification'){
      if(this.state.verified) return this.state.verification;
      else return <textarea onChange={this.updateText} value={this.state.verification}/>
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
    var verification = this.state.verification;

    if(verification !== undefined && !verification) return e.preventDefault();

    var checked = e.target.checked;

    var loanId = this.props.detail.loanId || this.props.primary;
    var edit = this.props.detail.edit || this.props.primary;
    var data = {};

    if(this.props.detail.verified !== undefined) data.verified = checked;
    else data.verification = this.state.verified ? '' : this.state.verification

    api.putEdit(edit, loanId, data, this.props.appStatus.set)
    this.setState({verified: checked});
  },

  updateText: function(e){
    this.setState({verification: e.target.value});
  },

  render: function(){
    var self = this;
    var detail = this.props.detail;
    return <tr key={this.props.id}>
      {Object.keys(detail).map(function(field, i){
        return <td key={i}>{self.makeTdContent(detail, field)}</td>
      }
      )}
      {this.state.verification !== undefined ? <td>{self.makeCheck()}</td> : null}
    </tr>
  }
});

module.exports = EditsDetailRow;
