var request = require("request");

var orders = {
  "orderLineDetailList": [
    {
      "id": 1,
      "userUsername": "admin_user",
      "orderDate": "2018-4-12",
      "totalAmount": "705.00",
      "depositeAmount": 0,
      "deliveryDate": "2018-4-19",
      "measureDate": "2018-4-7",
      "orderStatus": 3,
      "mountExist": false,
      "orderNumber": "SN521",
      "tailorOrderLineCount": 0
    },
    {
      "id": 11,
      "userUsername": "admin_user",
      "orderDate": "2018-4-12",
      "totalAmount": "270.00",
      "depositeAmount": 0,
      "deliveryDate": "2018-4-15",
      "measureDate": "2018-4-3",
      "orderStatus": 3,
      "mountExist": false,
      "orderNumber": "SN521",
      "tailorOrderLineCount": 0
    },
    {
      "id": 21,
      "userUsername": "admin_user",
      "orderDate": "2018-4-12",
      "totalAmount": "844.00",
      "depositeAmount": 0,
      "deliveryDate": "2018-5-12",
      "measureDate": "2018-4-6",
      "orderStatus": 3,
      "mountExist": false,
      "orderNumber": "SN521",
      "tailorOrderLineCount": 0
    },
    {
      "id": 31,
      "userUsername": "admin_user",
      "orderDate": "2018-4-12",
      "totalAmount": "402.00",
      "depositeAmount": 0,
      "deliveryDate": "2018-4-6",
      "measureDate": "2018-4-2",
      "orderStatus": 3,
      "mountExist": false,
      "orderNumber": "SN521",
      "tailorOrderLineCount": 0
    },
    {
      "id": 41,
      "userUsername": "admin_user",
      "orderDate": "2018-4-12",
      "totalAmount": "811.00",
      "depositeAmount": 0,
      "deliveryDate": "2018-5-3",
      "measureDate": "2018-4-7",
      "orderStatus": 3,
      "mountExist": false,
      "orderNumber": "SN521",
      "tailorOrderLineCount": 0
    },
    {
      "id": 51,
      "userUsername": "admin_user",
      "orderDate": "2018-4-12",
      "totalAmount": "601.00",
      "depositeAmount": 0,
      "deliveryDate": "2018-4-8",
      "measureDate": "2018-4-11",
      "orderStatus": 3,
      "mountExist": false,
      "orderNumber": "SN521",
      "tailorOrderLineCount": 0
    },
    {
      "id": 61,
      "userUsername": "admin_user",
      "orderDate": "2018-4-12",
      "totalAmount": "356.00",
      "depositeAmount": 0,
      "deliveryDate": "2018-4-14",
      "measureDate": "2018-4-16",
      "orderStatus": 3,
      "mountExist": false,
      "orderNumber": "SN521",
      "tailorOrderLineCount": 0
    },
    {
      "id": 71,
      "userUsername": "admin_user",
      "orderDate": "2018-4-12",
      "totalAmount": "468.00",
      "depositeAmount": 0,
      "deliveryDate": "2018-4-2",
      "measureDate": "2018-4-7",
      "orderStatus": 3,
      "mountExist": false,
      "orderNumber": "SN521",
      "tailorOrderLineCount": 0
    },
    {
      "id": 81,
      "userUsername": "admin_user",
      "orderDate": "2018-4-12",
      "totalAmount": "1073.00",
      "depositeAmount": 0,
      "deliveryDate": "2018-5-4",
      "measureDate": "2018-4-5",
      "orderStatus": 3,
      "mountExist": false,
      "orderNumber": "SN521",
      "tailorOrderLineCount": 0
    },
    {
      "id": 91,
      "userUsername": "admin_user",
      "orderDate": "2018-4-12",
      "totalAmount": "592.00",
      "depositeAmount": 0,
      "deliveryDate": "2018-4-1",
      "measureDate": "2018-4-18",
      "orderStatus": 3,
      "mountExist": false,
      "orderNumber": "SN521",
      "tailorOrderLineCount": 0
    },
    {
      "id": 101,
      "userUsername": "admin_user",
      "orderDate": "2018-4-12",
      "totalAmount": "1133.00",
      "depositeAmount": 0,
      "deliveryDate": "2018-5-20",
      "measureDate": "2018-4-16",
      "orderStatus": 3,
      "mountExist": false,
      "orderNumber": "SN521",
      "tailorOrderLineCount": 0
    },
    {
      "id": 111,
      "userUsername": "admin_user",
      "orderDate": "2018-4-12",
      "totalAmount": "264.00",
      "depositeAmount": 0,
      "deliveryDate": "2018-5-16",
      "measureDate": "2018-4-17",
      "orderStatus": 3,
      "mountExist": false,
      "orderNumber": "SN521",
      "tailorOrderLineCount": 0
    },
    {
      "id": 121,
      "userUsername": "admin_user",
      "orderDate": "2018-4-12",
      "totalAmount": "391.00",
      "depositeAmount": 0,
      "deliveryDate": "2018-4-19",
      "measureDate": "2018-4-18",
      "orderStatus": 3,
      "mountExist": false,
      "orderNumber": "SN521",
      "tailorOrderLineCount": 0
    },
    {
      "id": 131,
      "userUsername": "admin_user",
      "orderDate": "2018-4-12",
      "totalAmount": "246.00",
      "depositeAmount": 0,
      "deliveryDate": "2018-5-15",
      "measureDate": "2018-4-17",
      "orderStatus": 3,
      "mountExist": false,
      "orderNumber": "SN521",
      "tailorOrderLineCount": 0
    },
    {
      "id": 141,
      "userUsername": "admin_user",
      "orderDate": "2018-4-12",
      "totalAmount": "273.00",
      "depositeAmount": 0,
      "deliveryDate": "2018-5-18",
      "measureDate": "2018-4-11",
      "orderStatus": 3,
      "mountExist": false,
      "orderNumber": "SN521",
      "tailorOrderLineCount": 0
    },
    {
      "id": 151,
      "userUsername": "admin_user",
      "orderDate": "2018-4-12",
      "totalAmount": "822.00",
      "depositeAmount": 0,
      "deliveryDate": "2018-4-1",
      "measureDate": "2018-4-10",
      "orderStatus": 3,
      "mountExist": false,
      "orderNumber": "SN521",
      "tailorOrderLineCount": 0
    },
    {
      "id": 161,
      "userUsername": "admin_user",
      "orderDate": "2018-4-12",
      "totalAmount": "1055.00",
      "depositeAmount": 0,
      "deliveryDate": "2018-5-14",
      "measureDate": "2018-4-5",
      "orderStatus": 3,
      "mountExist": false,
      "orderNumber": "SN521",
      "tailorOrderLineCount": 0
    },
    {
      "id": 171,
      "userUsername": "admin_user",
      "orderDate": "2018-4-12",
      "totalAmount": "595.00",
      "depositeAmount": 0,
      "deliveryDate": "2018-5-17",
      "measureDate": "2018-4-15",
      "orderStatus": 3,
      "mountExist": false,
      "orderNumber": "SN521",
      "tailorOrderLineCount": 0
    },
    {
      "id": 181,
      "userUsername": "admin_user",
      "orderDate": "2018-4-12",
      "totalAmount": "271.00",
      "depositeAmount": 0,
      "deliveryDate": "2018-4-9",
      "measureDate": "2018-4-6",
      "orderStatus": 3,
      "mountExist": false,
      "orderNumber": "SN521",
      "tailorOrderLineCount": 0
    },
    {
      "id": 191,
      "userUsername": "admin_user",
      "orderDate": "2018-4-12",
      "totalAmount": "176.00",
      "depositeAmount": 0,
      "deliveryDate": "2018-4-2",
      "measureDate": "2018-4-5",
      "orderStatus": 3,
      "mountExist": false,
      "orderNumber": "SN521",
      "tailorOrderLineCount": 0
    },
    {
      "id": 201,
      "userUsername": "admin_user",
      "orderDate": "2018-4-12",
      "totalAmount": "444.00",
      "depositeAmount": 0,
      "deliveryDate": "2018-5-13",
      "measureDate": "2018-4-4",
      "orderStatus": 3,
      "mountExist": false,
      "orderNumber": "SN521",
      "tailorOrderLineCount": 0
    },
    {
      "id": 211,
      "userUsername": "admin_user",
      "orderDate": "2018-4-12",
      "totalAmount": "914.00",
      "depositeAmount": 0,
      "deliveryDate": "2018-5-3",
      "measureDate": "2018-4-19",
      "orderStatus": 3,
      "mountExist": false,
      "orderNumber": "SN521",
      "tailorOrderLineCount": 0
    },
    {
      "id": 221,
      "userUsername": "admin_user",
      "orderDate": "2018-4-12",
      "totalAmount": "683.00",
      "depositeAmount": 0,
      "deliveryDate": "2018-4-8",
      "measureDate": "2018-4-18",
      "orderStatus": 3,
      "mountExist": false,
      "orderNumber": "SN521",
      "tailorOrderLineCount": 0
    },
    {
      "id": 231,
      "userUsername": "admin_user",
      "orderDate": "2018-4-12",
      "totalAmount": "235.00",
      "depositeAmount": 0,
      "deliveryDate": "2018-4-16",
      "measureDate": "2018-4-7",
      "orderStatus": 3,
      "mountExist": false,
      "orderNumber": "SN521",
      "tailorOrderLineCount": 0
    },
    {
      "id": 241,
      "userUsername": "admin_user",
      "orderDate": "2018-4-12",
      "totalAmount": "1182.00",
      "depositeAmount": 0,
      "deliveryDate": "2018-4-11",
      "measureDate": "2018-4-16",
      "orderStatus": 3,
      "mountExist": false,
      "orderNumber": "SN521",
      "tailorOrderLineCount": 0
    },
    {
      "id": 251,
      "userUsername": "admin_user",
      "orderDate": "2018-4-12",
      "totalAmount": "840.00",
      "depositeAmount": 0,
      "deliveryDate": "2018-4-16",
      "measureDate": "2018-4-8",
      "orderStatus": 3,
      "mountExist": false,
      "orderNumber": "SN521",
      "tailorOrderLineCount": 0
    },
    {
      "id": 261,
      "userUsername": "admin_user",
      "orderDate": "2018-4-12",
      "totalAmount": "1144.00",
      "depositeAmount": 0,
      "deliveryDate": "2018-4-1",
      "measureDate": "2018-4-19",
      "orderStatus": 3,
      "mountExist": false,
      "orderNumber": "SN521",
      "tailorOrderLineCount": 0
    },
    {
      "id": 271,
      "userUsername": "admin_user",
      "orderDate": "2018-4-12",
      "totalAmount": "357.00",
      "depositeAmount": 0,
      "deliveryDate": "2018-5-15",
      "measureDate": "2018-4-9",
      "orderStatus": 3,
      "mountExist": false,
      "orderNumber": "SN521",
      "tailorOrderLineCount": 0
    },
    {
      "id": 281,
      "userUsername": "admin_user",
      "orderDate": "2018-4-12",
      "totalAmount": "1114.00",
      "depositeAmount": 0,
      "deliveryDate": "2018-4-7",
      "measureDate": "2018-4-16",
      "orderStatus": 3,
      "mountExist": false,
      "orderNumber": "SN521",
      "tailorOrderLineCount": 0
    },
    {
      "id": 291,
      "userUsername": "admin_user",
      "orderDate": "2018-4-12",
      "totalAmount": "867.00",
      "depositeAmount": 0,
      "deliveryDate": "2018-5-16",
      "measureDate": "2018-4-19",
      "orderStatus": 3,
      "mountExist": false,
      "orderNumber": "SN521",
      "tailorOrderLineCount": 0
    }
  ]
}


var postUrl = "https://measure-notebook-api.herokuapp.com/order/update";

orders.orderLineDetailList.forEach(function (order, index) {
  // if(index>13) return;
  request({
      url: postUrl,
      auth: {
        'user': 'admin_user',
        'pass': 'admin',
        'sendImmediately': false
      },
      method: 'PUT',
      json: true,
      body:order
    },
    function (error, response) {
    if(response) console.log(response);
      if(error) return console.log(error);
    }
  )
});
