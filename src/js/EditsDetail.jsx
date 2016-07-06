var React = require('react');
var api = require('./api');
var EditsDetailRow = require('./EditsDetailRow.jsx');

var EditsDetail = React.createClass({
  propTypes: {
    details: React.PropTypes.object,
    label: React.PropTypes.string,
    appStatus: React.PropTypes.objectOf(React.PropTypes.func).isRequired
  },

  componentWillMount: function(){
    if(!this.props.details) return;

    this.setState({
      verified: this.props.details.verified
    })
  },

  headerMap: {
    edit: 'Edit ID',
    lar: 'Loan ID',
    type: 'Edit Type',
    justification: 'Justification',
    verified: 'Verified'
  },

  verify: function(e){
    var checked = e.target.checked;

    var edit = this.props.label;
    var data = {verified: checked};

    api.putEdit(edit, data, this.props.appStatus.set)
    this.setState({verified: checked});
  },

  renderCheckAll: function() {
    var id = this.props.label + 'CheckAll';
    return (
      <tr>
        <td>
          <input type="checkbox" id={id} onChange={this.verify} checked={this.state.verified}/><label htmlFor={id}> I certify the accuracy of all data fields referenced by the {this.props.label} edits.</label>
        </td>
      </tr>
    )
  },

  render: function() {
    var self = this;
    var subGroup = this.props.details.edit ? this.props.details.lars : this.props.details.edits;
    if(!subGroup || !subGroup[0]) return null;

    var headers = Object.keys(subGroup[0]);
    if(!headers) return null;
    if(headers.indexOf('justification') !== -1) headers.push('verified');

    var appStatus = self.props.appStatus;

    return (
      <div className="EditsDetail expandable_content">
        <table width="100%">
          <thead>
            <tr>
              {headers.map(function(header, i){
                return <th key={i}>{self.headerMap[header]}</th>
              })}
            </tr>
          </thead>
          <tbody>
            {subGroup.map(function(detail, i){
              return <EditsDetailRow id={i} key={i} detail={detail} appStatus={appStatus}/>
            })}
            {this.props.details.verified !== undefined && this.props.details.edit ? this.renderCheckAll() : null}
          </tbody>
        </table>
      </div>
    )
  }
});

module.exports = EditsDetail;
