var React = require('react');
var ErrorsSyntax = require('./ErrorsSyntax.jsx');

var ErrorsContainer = React.createClass({
  getInitialState: function() {
    return {
      errors: {
        syntax: [],
        validity: [],
        quality: [],
        macro: []
      }
    }
  },

  componentDidMount: function() {
    var _this = this;
    _this.setState (
      {
        errors: {
          syntax: [
            {
              "loanNumber": "123455",
            	"errors": [
                {
              		"id": 1,
              		"desc": "Here is a desc",
              		"field": "Year",
              		"valueSubmitted": "1967"
              	}, {
              		"id": 2,
              		"desc": "Here is another desc",
              		"field": "Year",
              		"valueSubmitted": "1800"
              	}
              ]
            },
            {
              "loanNumber": "09876",
            	"errors": [
                {
              		"id": 1,
              		"desc": "Here is a desc",
              		"field": "Year",
              		"valueSubmitted": "1967"
              	}, {
              		"id": 2,
              		"desc": "Here is another desc",
              		"field": "Year",
              		"valueSubmitted": "1800"
              	}
              ]
            }
          ]
        }

      }
    )
  },

  render: function() {
    return (
      <div className="container">
        <div className="third">
          <p>Filing progress will go here. It could be in progress or complete or ...</p>
        </div>
        <div className="two-third">
          <ErrorsSyntax errors={this.state.errors.syntax} />
        </div>
      </div>
    )
  }
});

module.exports = ErrorsContainer;
