var React = require('react');
var EditsDetailRow = require('./EditsDetailRow.jsx');

var EditsDetail = React.createClass({
  propTypes: {
    details: React.PropTypes.array
  },

  headerMap: {
    edit: 'Edit ID',
    lar: 'LAR',
    type: 'Edit Type',
    verification: 'Verification'
  },

  render: function() {
    var self = this;
    if(!this.props.details || !this.props.details[0]) return null;

    var headers = Object.keys(this.props.details[0]);
    if(!headers) return null;

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
              return <EditsDetailRow id={i} key={i} detail={detail}/>
            })}
          </tbody>
        </table>
      </div>
    )
  }
});

module.exports = EditsDetail;
