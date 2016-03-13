var data = {
  user1:
    [
    {
      "name": "Bank 0",
      "status": 0,
      "editReports": []
    },
    {
      "name": "Bank 1",
      "status": 1,
      "editReports": [
      {"timestamp": 1457494448191}
      ]
    },
      {
        "name": "Bank 2",
        "status": 2,
        "editReports": [
        {
          "timestamp": 1457484448191,
          "edits": {
            "syntactical": 2,
            "validity": 1,
            "quality": 2,
            "macro": 1
          }
        }
        ]
      },
      {
        "name": "Bank 3",
        "status": 3,
        "editReports": [
        {
          "timestamp": 1457494448191,
          "edits": {
            "syntactical": 0,
            "validity": 0,
            "quality": 1,
            "macro": 0
          }
        },
        {
          "timestamp": 1457484448191,
          "edits": {
            "syntactical": 2,
            "validity": 1,
            "quality": 2,
            "macro": 1
          }
        },
          {
            "timestamp": 1457464448191,
            "edits": {
              "syntactical": 4,
              "validity": 3,
              "quality": 2,
              "macro": 1
            }
          }
        ]
      },
        {
          "name": "Bank 4",
          "status": 4,
          "editReports": [
          {
            "timestamp": 1457494448191,
            "edits": {
              "syntactical": 0,
              "validity": 0,
              "quality": 2,
              "macro": 0
            }
          }
          ]
        },
        {
          "name": "Bank 5",
          "status": 5,
          "editReports": [
          {
            "timestamp": 1457494448191,
            "edits": {
              "syntactical": 0,
              "validity": 0,
              "quality": 1,
              "macro": 0
            }
          }
          ]
        }
  ],
  user2:
      [
        {
          "name": "Another procrastinator",
          "status": 0,
          "editReports": []
        },
        {
          "name": "Getting coffee",
          "status": 1,
          "editReports": [
          {"timestamp": 1457494448191}
          ]
        },
        {
          "name": "Wacky data",
          "status": 2,
          "editReports": [
          {
              "timestamp": 1457484448191,
              "edits": {
                "syntactical": 2,
                "validity": 1,
                "quality": 2,
                "macro": 1
              }
            }
          ]
        },
        {
          "name": "Responsible fi",
          "status": 5,
          "editReports": [
            {
              "timestamp": 1457494448191,
              "edits": {
                "syntactical": 0,
                "validity": 0,
                "quality": 1,
                "macro": 0
              }
            }
          ]
        }
      ]
}

module.exports = {
  getInstitutions: function(name, cb){
    return cb(data[name] || []);
  },
  getErrors: function(){console.log('getting errors')},
  getProgress: function(){console.log('getting progress')}
};
