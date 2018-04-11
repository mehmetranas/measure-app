module.exports = function () {
  var faker = require("faker");
  var _ = require("lodash");

  return {
    orderDetail: {
      orderLineDetailList: _.times(600, function (n) {
        return {
          "id": faker.random.number({min:1, max:600}),
            "userUsername": "admin_user",
            "orderDate": "2018-"+faker.random.number({min:1, max:12})+"-"+faker.random.number({min:1, max:30}),
            "totalAmount": faker.commerce.price(150,1200),
            "depositeAmount": 0,
            "deliveryDate":  "2018-"+faker.random.number({min:1, max:12})+"-"+faker.random.number({min:1, max:30}),
            "measureDate": null,
            "orderStatus": 3,
            "mountExist": false,
            "orderNumber": "SN521",
            "tailorOrderLineCount": 0
        }
      })

    }
  }
}
