var React = require('react');
var EditsDetailRow = require('./EditsDetailRow.jsx');

var EditsDetail = React.createClass({
  propTypes: {
    details: React.PropTypes.array,
    primary: React.PropTypes.string,
    setAppStatus: React.PropTypes.func,
    type: React.PropTypes.string
  },

  headerMap: {
    edit: 'Edit ID',
    lar: 'Loan ID',
    type: 'Edit Type',
    verification: 'Verification',
    verified: 'Verified'
  },

  renderCheckAll: function() {
    if(this.props.type === 'quality') {
      return (
        <tr>
          <td colSpan="2">
            <input type="checkbox" value="Verify all {this.props.primary} quality" /> I certify to the accuracy of all data fields referenced by the {this.props.primary} quality edits.
          </td>
        </tr>
      )
    }
  },

  render: function() {
    var self = this;
    if(!this.props.details || !this.props.details[0]) return null;

    var headers = Object.keys(this.props.details[0]);
    if(!headers) return null;

    var primary = self.props.primary;
    var setAppStatus = self.props.setAppStatus;

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
            {this.props.details.map(function(detail, i){
              return <EditsDetailRow id={i} key={i} primary={primary} detail={detail} setAppStatus={setAppStatus}/>
            })}
            {self.renderCheckAll()}
          </tbody>
        </table>

      </div>
    )
  }
});

module.exports = EditsDetail;
