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

  makeTdContent: function(edit, field){
    if(field === 'justification' && !edit.verified) return <textarea value={edit.justification}/>
    if(field === 'verified') return <input type="checkbox" checked={edit.verified}/>
    return edit[field];
  },

  render: function() {
    var _this = this;
    if(!this.props.edits) return null;
    var headers = Object.keys(this.props.edits[0]);
    if(!headers) return null;

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
                    return <td key={i}>{_this.makeTdContent(edit, field)}</td>
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
