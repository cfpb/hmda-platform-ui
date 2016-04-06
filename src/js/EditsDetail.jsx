var React = require('react');

var EditsDetail = React.createClass({
  propTypes: {
    edits: React.PropTypes.array
  },

  headerMap: {
    id: 'Edit ID',
    desc: 'Description',
    field: 'Field',
    valueSubmitted: 'Value Submitted',
    justification: 'Justification',
    verified: 'Verified'
  },

  render: function() {
    var _this = this;
    var headers = Object.keys(this.props.edits[0]);
    if(!headers) return;

    return (
      <div className="EditsDetail">
        <table width="100%">
          <thead>
            <tr>
              {headers.map(function(header, i){
                return <th key={i}>{_this.headerMap[header]}</th>
              })}
            </tr>
          </thead>
          <tbody>
            {this.props.edits.map(function(edit, i){
              return (
                <tr key={i}>
                  {Object.keys(edit).map(function(field, i){
                    return <td key={i}>{edit[field]}</td>
                  })}
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    )
  }
});

module.exports = EditsDetail;
