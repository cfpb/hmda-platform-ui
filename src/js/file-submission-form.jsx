var React = require('react');
//
module.exports = React.createClass({
  render: function() {
    return <form>
      <input id="hmda-file" name="hmda-file" type="file"></input>
      <input id="validate" name="validate" type="button" value="Start Validation"></input>
    </form>
  }
});
