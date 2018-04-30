module.exports = function () {
  var faker = require("faker");
  var _ = require("lodash");

  faker.locale = 'tr';

  return {
    orderDetail: {
      orderLineDetailList: _.times(30, function (n) {
        return {
        "tenantName": faker.name.findName()
        }
      })
    }
  }
}
