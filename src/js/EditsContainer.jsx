var React = require('react');
var EditsSyntacticalValidity = require('./EditsSyntacticalValidity.jsx');

var EditsContainer = React.createClass({
  getInitialState: function() {
    return {
    	"edits": {
    		"syntactical": [],
    		"validity": [],
    		"quality": [],
    		"macro": []
    	}
    }
  },

  componentDidMount: function() {
    var _this = this;
    _this.setState (
      {
        "edits": {
          "syntactical": [
            {
              "loanNumber": "123455",
            	"edits": [
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
              	}, {
              		"id": 3,
              		"desc": "Here is another desc",
              		"field": "Year",
              		"valueSubmitted": "1800"
              	}
              ]
            },
            {
              "loanNumber": "09876",
            	"edits": [
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
          ],
          "validity": [
            {
              "loanNumber": "123455",
            	"edits": [
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
              	}, {
              		"id": 3,
              		"desc": "Here is another desc",
              		"field": "Year",
              		"valueSubmitted": "1800"
              	}
              ]
            },
            {
              "loanNumber": "09876",
            	"edits": [
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
          <div>
            <h2>Syntactical Edits</h2>
            <p>This is a description of the syntactical edits. It will provide information to filers about the edits they are about to see.</p>
            <EditsSyntacticalValidity id="syntactical" edits={this.state.edits.syntactical} />
          </div>
          <div>
            <h2>Validity Edits</h2>
            <p>This is a description of the validity edits. It will provide information to filers about the edits they are about to see.</p>
            <EditsSyntacticalValidity id="validity" edits={this.state.edits.validity} />
          </div>

        </div>
      </div>
    )
  }
});

module.exports = EditsContainer;
