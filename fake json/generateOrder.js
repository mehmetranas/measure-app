module.exports = function () {
  var faker = require("faker");
  var _ = require("lodash");
  faker.locale ='tr';

  return {
    orderDetail: {
      orderLineDetailList: _.times(30, function (n) {
        return {
          "id": (n*10) + 2,
            "userUsername": faker.name.firstName(),
            "orderDate": "2018-"+faker.random.number({min:5, max:5})+"-"+faker.random.number({min:1, max:6}),
            "totalAmount": faker.commerce.price(150,1200),
            "depositeAmount": 0,
            "deliveryDate":  faker.random.number({min:2018, max:2018}) + "-" +faker.random.number({min:5, max:6})+"-"+faker.random.number({min:1, max:20}),
            "measureDate": "2018-"+faker.random.number({min:5, max:6})+"-"+faker.random.number({min:1, max:20}),
            "orderStatus": faker.random.number({min:0,max:6}),
            "mountExist": faker.random.boolean(),
            "orderNumber": "SN"+faker.random.number({min:45,max:1000}),
            "tailorOrderLineCount": 0
        }
      })

    }
  }
}
