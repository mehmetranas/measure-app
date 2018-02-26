var request = require("request");

//via faker random data
// var orderlines = [
//   {
//     "orderline": {
//       "order": {
//         "id": 1,
//         "customer": {
//           "id": null,
//           "newsletterAccepted": false
//         }
//       },
//       "product": {
//         "productValue": 1,
//         "variantCode": "voluptatem quia velit",
//         "patternCode": "assumenda voluptatibus atque",
//         "aliasName": "sed nostrum repudiandae"
//       },
//       "locationName": 3,
//       "locationType": "Pencere 1",
//       "piecesCount": 5,
//       "mechanismStatus": 0,
//       "productValue": 0,
//       "propertyWidth": 52,
//       "propertyHeight": 53,
//       "mountType": 2,
//       "lineDescription": "maiores exercitationem qui",
//       "unitPrice": 8
//     }
//   },
//   {
//     "orderline": {
//       "order": {
//         "id": 1,
//         "customer": {
//           "id": null,
//           "newsletterAccepted": false
//         }
//       },
//       "product": {
//         "productValue": 1,
//         "variantCode": "eaque placeat ex",
//         "patternCode": "quibusdam omnis molestiae",
//         "aliasName": "aspernatur doloremque dolore"
//       },
//       "locationName": 1,
//       "locationType": "Kapı 1",
//       "piecesCount": 1,
//       "mechanismStatus": 1,
//       "productValue": 1,
//       "propertyWidth": 100,
//       "propertyHeight": 92,
//       "mountType": 0,
//       "lineDescription": "assumenda et ipsa",
//       "unitPrice": 11
//     }
//   },
//   {
//     "orderline": {
//       "order": {
//         "id": 1,
//         "customer": {
//           "id": null,
//           "newsletterAccepted": false
//         }
//       },
//       "product": {
//         "productValue": 1,
//         "variantCode": "fuga beatae saepe",
//         "patternCode": "quo at enim",
//         "aliasName": "magni illum assumenda"
//       },
//       "locationName": 3,
//       "locationType": "Pencere 3",
//       "piecesCount": 1,
//       "mechanismStatus": 2,
//       "productValue": 6,
//       "propertyWidth": 24,
//       "propertyHeight": 1,
//       "mountType": 0,
//       "lineDescription": "id vero quas",
//       "unitPrice": 8
//     }
//   },
//   {
//     "orderline": {
//       "order": {
//         "id": 1,
//         "customer": {
//           "id": null,
//           "newsletterAccepted": false
//         }
//       },
//       "product": {
//         "productValue": 2,
//         "variantCode": "totam iure mollitia",
//         "patternCode": "ducimus placeat incidunt",
//         "aliasName": "et doloribus dolores"
//       },
//       "locationName": 1,
//       "locationType": "Kapı 1",
//       "piecesCount": 2,
//       "mechanismStatus": 3,
//       "productValue": 4,
//       "propertyWidth": 9,
//       "propertyHeight": 86,
//       "mountType": 2,
//       "lineDescription": "magni aut aliquid",
//       "unitPrice": 15
//     }
//   },
//   {
//     "orderline": {
//       "order": {
//         "id": 1,
//         "customer": {
//           "id": null,
//           "newsletterAccepted": false
//         }
//       },
//       "product": {
//         "productValue": 2,
//         "variantCode": "harum ipsa cumque",
//         "patternCode": "voluptates voluptatem ratione",
//         "aliasName": "repudiandae occaecati hic"
//       },
//       "locationName": 0,
//       "locationType": "Pencere 3",
//       "piecesCount": 3,
//       "mechanismStatus": 0,
//       "productValue": 6,
//       "propertyWidth": 15,
//       "propertyHeight": 125,
//       "mountType": 0,
//       "lineDescription": "quia non est",
//       "unitPrice": 4
//     }
//   },
//   {
//     "orderline": {
//       "order": {
//         "id": 1,
//         "customer": {
//           "id": null,
//           "newsletterAccepted": true
//         }
//       },
//       "product": {
//         "productValue": 2,
//         "variantCode": "fugiat unde assumenda",
//         "patternCode": "doloremque facere nesciunt",
//         "aliasName": "culpa voluptatem ipsam"
//       },
//       "locationName": 4,
//       "locationType": "Pencere 1",
//       "piecesCount": 4,
//       "mechanismStatus": 0,
//       "productValue": 2,
//       "propertyWidth": 37,
//       "propertyHeight": 42,
//       "mountType": 0,
//       "lineDescription": "odit quibusdam vero",
//       "unitPrice": 7
//     }
//   },
//   {
//     "orderline": {
//       "order": {
//         "id": 1,
//         "customer": {
//           "id": null,
//           "newsletterAccepted": false
//         }
//       },
//       "product": {
//         "productValue": 3,
//         "variantCode": "veritatis debitis nemo",
//         "patternCode": "qui saepe beatae",
//         "aliasName": "enim est cumque"
//       },
//       "locationName": 3,
//       "locationType": "Kapı 1",
//       "piecesCount": 5,
//       "mechanismStatus": 3,
//       "productValue": 6,
//       "propertyWidth": 53,
//       "propertyHeight": 76,
//       "mountType": 2,
//       "lineDescription": "laboriosam non possimus",
//       "unitPrice": 0
//     }
//   },
//   {
//     "orderline": {
//       "order": {
//         "id": 1,
//         "customer": {
//           "id": null,
//           "newsletterAccepted": false
//         }
//       },
//       "product": {
//         "productValue": 2,
//         "variantCode": "ut saepe fugit",
//         "patternCode": "laudantium quia soluta",
//         "aliasName": "sit quasi in"
//       },
//       "locationName": 0,
//       "locationType": "Pencere 3",
//       "piecesCount": 2,
//       "mechanismStatus": 3,
//       "productValue": 2,
//       "propertyWidth": 29,
//       "propertyHeight": 57,
//       "mountType": 2,
//       "lineDescription": "architecto repellat eos",
//       "unitPrice": 5
//     }
//   },
//   {
//     "orderline": {
//       "order": {
//         "id": 1,
//         "customer": {
//           "id": null,
//           "newsletterAccepted": true
//         }
//       },
//       "product": {
//         "productValue": 0,
//         "variantCode": "eos harum aspernatur",
//         "patternCode": "illum et repudiandae",
//         "aliasName": "et sunt porro"
//       },
//       "locationName": 2,
//       "locationType": "Pencere 3",
//       "piecesCount": 4,
//       "mechanismStatus": 2,
//       "productValue": 5,
//       "propertyWidth": 91,
//       "propertyHeight": 150,
//       "mountType": 2,
//       "lineDescription": "vel qui aliquam",
//       "unitPrice": 5
//     }
//   },
//   {
//     "orderline": {
//       "order": {
//         "id": 1,
//         "customer": {
//           "id": null,
//           "newsletterAccepted": false
//         }
//       },
//       "product": {
//         "productValue": 3,
//         "variantCode": "recusandae et quibusdam",
//         "patternCode": "sed ea ab",
//         "aliasName": "quaerat ea sequi"
//       },
//       "locationName": 4,
//       "locationType": "Pencere 1",
//       "piecesCount": 4,
//       "mechanismStatus": 3,
//       "productValue": 1,
//       "propertyWidth": 34,
//       "propertyHeight": 114,
//       "mountType": 0,
//       "lineDescription": "consequatur vero porro",
//       "unitPrice": 10
//     }
//   },
//   {
//     "orderline": {
//       "order": {
//         "id": 1,
//         "customer": {
//           "id": null,
//           "newsletterAccepted": false
//         }
//       },
//       "product": {
//         "productValue": 1,
//         "variantCode": "nulla voluptatibus qui",
//         "patternCode": "quia autem ut",
//         "aliasName": "omnis necessitatibus odit"
//       },
//       "locationName": 1,
//       "locationType": "Pencere 3",
//       "piecesCount": 5,
//       "mechanismStatus": 3,
//       "productValue": 1,
//       "propertyWidth": 23,
//       "propertyHeight": 58,
//       "mountType": 1,
//       "lineDescription": "neque quaerat est",
//       "unitPrice": 11
//     }
//   },
//   {
//     "orderline": {
//       "order": {
//         "id": 1,
//         "customer": {
//           "id": null,
//           "newsletterAccepted": false
//         }
//       },
//       "product": {
//         "productValue": 2,
//         "variantCode": "eaque blanditiis libero",
//         "patternCode": "inventore nemo omnis",
//         "aliasName": "et maiores fuga"
//       },
//       "locationName": 3,
//       "locationType": "Kapı 1",
//       "piecesCount": 5,
//       "mechanismStatus": 0,
//       "productValue": 4,
//       "propertyWidth": 100,
//       "propertyHeight": 121,
//       "mountType": 0,
//       "lineDescription": "qui omnis et",
//       "unitPrice": 13
//     }
//   },
//   {
//     "orderline": {
//       "order": {
//         "id": 1,
//         "customer": {
//           "id": null,
//           "newsletterAccepted": true
//         }
//       },
//       "product": {
//         "productValue": 0,
//         "variantCode": "molestiae suscipit nisi",
//         "patternCode": "amet velit fuga",
//         "aliasName": "optio excepturi ut"
//       },
//       "locationName": 3,
//       "locationType": "Pencere 1",
//       "piecesCount": 1,
//       "mechanismStatus": 3,
//       "productValue": 3,
//       "propertyWidth": 88,
//       "propertyHeight": 31,
//       "mountType": 1,
//       "lineDescription": "est nesciunt quidem",
//       "unitPrice": 15
//     }
//   },
//   {
//     "orderline": {
//       "order": {
//         "id": 1,
//         "customer": {
//           "id": null,
//           "newsletterAccepted": true
//         }
//       },
//       "product": {
//         "productValue": 2,
//         "variantCode": "earum fugit libero",
//         "patternCode": "sint facilis molestiae",
//         "aliasName": "quia minima rerum"
//       },
//       "locationName": 4,
//       "locationType": "Pencere 2",
//       "piecesCount": 0,
//       "mechanismStatus": 1,
//       "productValue": 6,
//       "propertyWidth": 60,
//       "propertyHeight": 86,
//       "mountType": 1,
//       "lineDescription": "iste vel qui",
//       "unitPrice": 2
//     }
//   },
//   {
//     "orderline": {
//       "order": {
//         "id": 1,
//         "customer": {
//           "id": null,
//           "newsletterAccepted": true
//         }
//       },
//       "product": {
//         "productValue": 1,
//         "variantCode": "et quo dolore",
//         "patternCode": "consequatur ducimus dolor",
//         "aliasName": "vel omnis dignissimos"
//       },
//       "locationName": 2,
//       "locationType": "Kapı 1",
//       "piecesCount": 3,
//       "mechanismStatus": 0,
//       "productValue": 4,
//       "propertyWidth": 92,
//       "propertyHeight": 84,
//       "mountType": 2,
//       "lineDescription": "in nobis maiores",
//       "unitPrice": 4
//     }
//   }
// ]
// really data
var orderlines = [
  {
    "order": {"id": 1, "customer": {"id": null, "newsletterAccepted": false}},
    "product": {"productValue": 0, "patternCode": "tül desen", "variantCode": "tül varyant", "aliasName": "Taç Tül"},
    "locationName": 0,
    "locationType": "Pencere 1",
    "piecesCount": 0,
    "mechanismStatus": 0,
    "productValue": 0,
    "propertyWidth": 110,
    "propertyHeight": 200,
    "mountType": 1,
    "sizeOfPile": 3,
    "lineDescription": "test tül",
    "unitPrice": 11
  },
  {
    "order": {"id": 1, "customer": {"id": null, "newsletterAccepted": false}},
    "product": {
      "productValue": 1,
      "patternCode": "Güneşlik desen",
      "variantCode": "Güneşlik Varyant",
      "aliasName": "Taç Güneşlik"
    },
    "locationName": 1,
    "locationType": "Pencere 2",
    "piecesCount": 0,
    "mechanismStatus": 0,
    "productValue": 1,
    "propertyWidth": 110,
    "propertyHeight": 100,
    "mountType": 1,
    "sizeOfPile": 3,
    "lineDescription": "TEst Günbeşlik",
    "unitPrice": 12,
    "patternCode": null,
    "variantCode": null,
    "aliasName": null
  },
  {
    "order": {"id": 1, "customer": {"id": null, "newsletterAccepted": false}},
    "product": {
      "productValue": 2,
      "patternCode": "Tek Kasa  Desen",
      "variantCode": "Tek Kasa  Varyant",
      "aliasName": "Taç Tek Kasa "
    },
    "locationName": 1,
    "locationType": "Kapı 2",
    "mechanismStatus": 0,
    "productValue": 2,
    "propertyWidth": 80,
    "propertyHeight": 88,
    "mountType": 2,
    "sizeOfPile": 3,
    "lineDescription": "Test Tek Kasa ",
    "unitPrice": 11.5,
    "patternCode": null,
    "variantCode": null,
    "aliasName": null,
    "isSkirtSliced": true,
    "skirtNo": "5",
    "direction": 2
  },
  {
    "order": {"id": 1, "customer": {"id": null, "newsletterAccepted": false}},
    "product": {
      "productValue": 2,
      "patternCode": "Stor Parçalı Desen",
      "variantCode": "Stor Parçalı varyant",
      "aliasName": "Taç Stor Parçalı"
    },
    "locationName": 2,
    "locationType": "Pencere 2",
    "piecesCount": 2,
    "mechanismStatus": 1,
    "productValue": 2,
    "propertyWidth": 80,
    "propertyHeight": 90,
    "mountType": 2,
    "sizeOfPile": 3,
    "lineDescription": "Tet Parçalı  Store",
    "unitPrice": 11.8,
    "patternCode": null,
    "variantCode": null,
    "aliasName": null,
    "isSkirtSliced": false,
    "skirtNo": " ",
    "direction": 2,
    "isBeaded": true,
    "beadNo": "GT-45"
  },
  {
    "order": {"id": 1, "customer": {"id": null, "newsletterAccepted": false}},
    "product": {
      "productValue": 2,
      "patternCode": "Stor Parçalı Desen",
      "variantCode": "Stor Parçalı varyant",
      "aliasName": "Taç Stor Parçalı"
    },
    "locationName": 2,
    "locationType": "Pencere 2",
    "piecesCount": 2,
    "mechanismStatus": 1,
    "productValue": 2,
    "propertyWidth": 100,
    "propertyHeight": 115,
    "mountType": 2,
    "sizeOfPile": 3,
    "lineDescription": "Tet Parçalı  Store",
    "unitPrice": 11.8,
    "patternCode": null,
    "variantCode": null,
    "aliasName": null,
    "isSkirtSliced": false,
    "skirtNo": " ",
    "direction": 1,
    "isBeaded": true,
    "beadNo": "GT-45"
  },
  {
    "order": {"id": 1, "customer": {"id": null, "newsletterAccepted": false}},
    "product": {
      "productValue": 2,
      "patternCode": "Tek Kasa + Çoklu Mekanizma desen",
      "variantCode": "Tek Kasa + Çoklu Mekanizma varyant",
      "aliasName": "Taç Tek Kasa + Çoklu Mekanizma"
    },
    "locationName": 1,
    "locationType": "Pencere 2",
    "piecesCount": 2,
    "mechanismStatus": 2,
    "productValue": 2,
    "patternCode": null,
    "variantCode": null,
    "aliasName": null,
    "mountType": 2,
    "isSkirtSliced": true,
    "skirtNo": "T-5",
    "lineDescription": "Test Tek Kasa + Çoklu Mekanizma",
    "unitPrice": 12.5,
    "propertyWidth": 85,
    "propertyHeight": 90,
    "direction": 2
  },
  {
    "order": {"id": 1, "customer": {"id": null, "newsletterAccepted": false}},
    "product": {
      "productValue": 2,
      "patternCode": "Tek Kasa + Çoklu Mekanizma desen",
      "variantCode": "Tek Kasa + Çoklu Mekanizma varyant",
      "aliasName": "Taç Tek Kasa + Çoklu Mekanizma"
    },
    "locationName": 1,
    "locationType": "Pencere 2",
    "piecesCount": 2,
    "mechanismStatus": 2,
    "productValue": 2,
    "patternCode": null,
    "variantCode": null,
    "aliasName": null,
    "mountType": 2,
    "isSkirtSliced": true,
    "skirtNo": "T-5",
    "lineDescription": "Test Tek Kasa + Çoklu Mekanizma",
    "unitPrice": 12.5,
    "propertyWidth": 85,
    "propertyHeight": 100,
    "direction": 2
  },
  {
    "order": {"id": 11, "customer": {"id": null, "newsletterAccepted": false}},
    "product": {
      "productValue": 3,
      "patternCode": "Zebra Tek Kasa Desen",
      "variantCode": "Zebra Tek Kasa varyant",
      "aliasName": "Taç zebra "
    },
    "locationName": 3,
    "mechanismStatus": 0,
    "locationType": "Pencere 1",
    "productValue": 3,
    "propertyWidth": 110,
    "propertyHeight": 210,
    "mountType": 1,
    "isSkirtSliced": true,
    "skirtNo": "ZB-3",
    "direction": 2,
    "lineDescription": "Test Zebra Tek Kasa",
    "unitPrice": 12
  },

];

var postOrderlineUrl = "https://measure-notebook-api.herokuapp.com/order/line/add";

orderlines.forEach(function (orderline, index) {
  // if(index>0) return;
  request({
      url: postOrderlineUrl,
      auth: {
        'user': 'admin_user',
        'pass': 'admin',
        'sendImmediately': false
      },
      method: 'POST',
      json: true,
      body: orderline.orderline
    },
    function (error, response) {
      if (error) return console.log(error);
      console.log("Success", response);
    }
  )
});
