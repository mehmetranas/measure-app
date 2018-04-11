module.exports = function () {
  var faker = require("faker");
  var _ = require("lodash");

  return {
    orderDetail: {
      orderLineDetailList: _.times(60, function (n) {
        return {
          "id": (n*10) + 1,
            "userUsername": "admin_user",
            "orderDate": "2018-"+faker.random.number({min:1, max:4})+"-"+faker.random.number({min:1, max:30}),
            "totalAmount": faker.commerce.price(150,1200),
            "depositeAmount": 0,
            "deliveryDate":  faker.random.number({min:2018, max:2018}) + "-" +faker.random.number({min:4, max:5})+"-"+faker.random.number({min:1, max:20}),
            "measureDate": "2018-"+faker.random.number({min:4, max:4})+"-"+faker.random.number({min:1, max:20}),
            "orderStatus": 3,
            "mountExist": false,
            "orderNumber": "SN521",
            "tailorOrderLineCount": 0
        }
      })

    }
  }
}
