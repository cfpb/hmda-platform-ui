var React = require('react');
var Multicheck = require('./Multicheck.jsx');

var EditsDetailRow = React.createClass({

  propTypes: {
    detail: React.PropTypes.object.isRequired,
    id: React.PropTypes.number,
    appStatus: React.PropTypes.objectOf(React.PropTypes.func).isRequired
  },

  makeTdContent: function(detail, field){
    if(field === 'justification') return <Multicheck justification={detail[field]} appStatus={this.props.appStatus}/>
    if(field === 'lar') return detail[field].loanId;
    return detail[field];
  },

  render: function(){
    var self = this;
    var detail = this.props.detail;
    return <tr key={this.props.id}>
      {Object.keys(detail).map(function(field, i){
        return <td key={i}>{self.makeTdContent(detail, field)}</td>
      }
      )}
    </tr>
  }
});

module.exports = EditsDetailRow;
