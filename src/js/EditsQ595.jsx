var React = require('react');

var EditsQ595 = React.createClass({
  propTypes: {
    group: React.PropTypes.array
  },

  makeRadio: function(count) {
    return (
      <div>
        <input type="radio" name={"msaNotPanel-" + count} value="yes" /> Yes &nbsp;
        <input type="radio" name={"msaNotPanel-" + count} value="no" /> No
      </div>
    )
  },

  render: function() {
    var self = this;
    return (
      <div className="EditsQ595 full edits">
        <table width="100%">
          <thead>
            <tr>
              <th>MSA/MD</th>
              <th>MSA/MD Name</th>
              <th>MSA/MD LAR Count</th>
              <th>Do you have an office in this MSA/MD?</th>
            </tr>
          </thead>
          <tbody>
            {self.props.group.map(function(detail, i){
              return <tr key={i}>
                <td>{detail.msaID}</td>
                <td>{detail.msaName}</td>
                <td>{detail.larCount}</td>
                <td>{self.makeRadio(i)}</td>
              </tr>
            })}
          </tbody>
        </table>
      </div>
    )
  }
});

module.exports = EditsQ595;
