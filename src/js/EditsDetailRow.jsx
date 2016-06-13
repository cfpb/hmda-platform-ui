var React = require('react');
var EditsDetailRow = React.createClass({

  propTypes: {
    detail: React.PropTypes.object.isRequired,
    id: React.PropTypes.number,
    setAppStatus: React.PropTypes.func
  },

  componentWillMount: function(){
    this.setState({
      verification: this.props.detail.verification,
      verified: !!this.props.detail.verification
    });
  },

  makeTdContent: function(detail, field){
    if(field === 'verification'){
      if(this.state.verified) return this.state.verification;
      else return <textarea onChange={this.updateText} value={this.state.verification}/>
    }
    if(field === 'lar') return detail[field].loanId;
    return detail[field];
  },

  makeCheck: function(){
    if(this.state.verification !== undefined){
      return <td><input type="checkbox" onChange={this.toggleText} checked={this.state.verified}/></td>
    }
  },

  toggleText: function(e){
    if(!this.state.verification){
      return e.preventDefault();
    }

    var checked = e.target.checked;
    this.setState({verified: checked})

    api.putEdit(this.setStatusFromEditUpdate)
  },

  setStatusFromEditUpdate: function(response){
    this.props.setAppStatus(response.status);
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
      {self.makeCheck()}
    </tr>
  }
});

module.exports = EditsDetailRow;
