var request = require("request");
var getUrl = "https://167.99.81.86:8181/order/list";

request({
    url: getUrl,
    auth: {
      'user': 'admin_user',
      'pass': 'admin',
      'sendImmediately': false
    },
    method: 'POST',
    json: true,
    body:{"first":"0","rows":"10"}
  },
  function (error, response) {
    if(error) return console.log(error);
    if(response) {
      console.log("sort",response);
    }
  }
)
