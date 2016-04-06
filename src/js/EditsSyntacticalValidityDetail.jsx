var React = require('react');

var EditsSyntacticalValidity = React.createClass({
  propTypes: {
    edits: React.PropTypes.array
  },
  render: function() {
    var _this = this;
    return (
      <div className="EditsSyntacticalValidityDetail edits-detail">
        <table width="100%">
          <thead>
            <tr>
              <th width="15%">Edit ID</th>
              <th width="45%">Description</th>
              <th width="15%">Field</th>
              <th width="25%">Submitted Value</th>
            </tr>
          </thead>
          <tbody>
            {this.props.edits.map(function(edit, i) {
              return (
                <tr key={edit.id}>
                  <td>{edit.id}</td>
                  <td>{edit.desc}</td>
                  <td>{edit.field}</td>
                  <td>{edit.valueSubmitted}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    )
  }
});

module.exports = EditsSyntacticalValidity;
