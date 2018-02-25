module.exports = function () {
  var faker =require("faker");
  var _ = require("lodash");

  return {
      orderlines: _.times(15, function (n) {
        return {
        orderline : {
          "order":
          {
            "id":2,"customer":
            {
              "id":null,"newsletterAccepted":faker.random.boolean()
            }},
          "product":
          {
            "productValue":faker.random.number(3),
            "variantCode":faker.lorem.words(),
            "patternCode":faker.lorem.words(),
            "aliasName":faker.lorem.words()
          },
          "locationName": faker.random.number(5),
          "locationType": faker.random.arrayElement(["Pencere 1","Kapı 1","Pencere 2","Pencere 3"]),
          "piecesCount": faker.random.number(5),
          "mechanismStatus":faker.random.number(3),
          "productValue":faker.random.number(6),
          "propertyWidth":faker.random.number(100),
          "propertyHeight":faker.random.number(150),
          "mountType":faker.random.number(2),
          "lineDescription":faker.lorem.words(),
          "unitPrice":faker.random.number(15)
        }
        }
      })
  }
}
