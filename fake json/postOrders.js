var request = require("request");

var orders = {
  "orderLineDetailList": [
    {
      "id": 2,
      "userUsername": "admin_user",
      "orderDate": "2018-4-12",
      "totalAmount": "488.00",
      "depositeAmount": 0,
      "deliveryDate": "2018-4-6",
      "measureDate": "2018-4-7",
      "orderStatus": 3,
      "mountExist": false,
      "orderNumber": "SN521",
      "tailorOrderLineCount": 0
    },
    {
      "id": 12,
      "userUsername": "admin_user",
      "orderDate": "2018-4-12",
      "totalAmount": "960.00",
      "depositeAmount": 0,
      "deliveryDate": "2018-5-2",
      "measureDate": "2018-4-15",
      "orderStatus": 3,
      "mountExist": false,
      "orderNumber": "SN521",
      "tailorOrderLineCount": 0
    },
    {
      "id": 22,
      "userUsername": "admin_user",
      "orderDate": "2018-4-12",
      "totalAmount": "475.00",
      "depositeAmount": 0,
      "deliveryDate": "2018-5-10",
      "measureDate": "2018-4-4",
      "orderStatus": 3,
      "mountExist": false,
      "orderNumber": "SN521",
      "tailorOrderLineCount": 0
    },
    {
      "id": 32,
      "userUsername": "admin_user",
      "orderDate": "2018-4-12",
      "totalAmount": "986.00",
      "depositeAmount": 0,
      "deliveryDate": "2018-5-19",
      "measureDate": "2018-4-1",
      "orderStatus": 3,
      "mountExist": false,
      "orderNumber": "SN521",
      "tailorOrderLineCount": 0
    },
    {
      "id": 42,
      "userUsername": "admin_user",
      "orderDate": "2018-4-12",
      "totalAmount": "704.00",
      "depositeAmount": 0,
      "deliveryDate": "2018-4-13",
      "measureDate": "2018-4-9",
      "orderStatus": 3,
      "mountExist": false,
      "orderNumber": "SN521",
      "tailorOrderLineCount": 0
    },
    {
      "id": 52,
      "userUsername": "admin_user",
      "orderDate": "2018-4-12",
      "totalAmount": "786.00",
      "depositeAmount": 0,
      "deliveryDate": "2018-4-15",
      "measureDate": "2018-4-5",
      "orderStatus": 3,
      "mountExist": false,
      "orderNumber": "SN521",
      "tailorOrderLineCount": 0
    },
    {
      "id": 62,
      "userUsername": "admin_user",
      "orderDate": "2018-4-12",
      "totalAmount": "1192.00",
      "depositeAmount": 0,
      "deliveryDate": "2018-4-11",
      "measureDate": "2018-4-1",
      "orderStatus": 3,
      "mountExist": false,
      "orderNumber": "SN521",
      "tailorOrderLineCount": 0
    },
    {
      "id": 72,
      "userUsername": "admin_user",
      "orderDate": "2018-4-12",
      "totalAmount": "297.00",
      "depositeAmount": 0,
      "deliveryDate": "2018-4-19",
      "measureDate": "2018-4-1",
      "orderStatus": 3,
      "mountExist": false,
      "orderNumber": "SN521",
      "tailorOrderLineCount": 0
    },
    {
      "id": 82,
      "userUsername": "admin_user",
      "orderDate": "2018-4-12",
      "totalAmount": "234.00",
      "depositeAmount": 0,
      "deliveryDate": "2018-5-2",
      "measureDate": "2018-4-10",
      "orderStatus": 3,
      "mountExist": false,
      "orderNumber": "SN521",
      "tailorOrderLineCount": 0
    },
    {
      "id": 92,
      "userUsername": "admin_user",
      "orderDate": "2018-4-12",
      "totalAmount": "996.00",
      "depositeAmount": 0,
      "deliveryDate": "2018-4-5",
      "measureDate": "2018-4-15",
      "orderStatus": 3,
      "mountExist": false,
      "orderNumber": "SN521",
      "tailorOrderLineCount": 0
    },
    {
      "id": 102,
      "userUsername": "admin_user",
      "orderDate": "2018-4-12",
      "totalAmount": "267.00",
      "depositeAmount": 0,
      "deliveryDate": "2018-4-13",
      "measureDate": "2018-4-16",
      "orderStatus": 3,
      "mountExist": false,
      "orderNumber": "SN521",
      "tailorOrderLineCount": 0
    },
    {
      "id": 112,
      "userUsername": "admin_user",
      "orderDate": "2018-4-12",
      "totalAmount": "920.00",
      "depositeAmount": 0,
      "deliveryDate": "2018-5-14",
      "measureDate": "2018-4-7",
      "orderStatus": 3,
      "mountExist": false,
      "orderNumber": "SN521",
      "tailorOrderLineCount": 0
    },
    {
      "id": 122,
      "userUsername": "admin_user",
      "orderDate": "2018-4-12",
      "totalAmount": "673.00",
      "depositeAmount": 0,
      "deliveryDate": "2018-5-14",
      "measureDate": "2018-4-15",
      "orderStatus": 3,
      "mountExist": false,
      "orderNumber": "SN521",
      "tailorOrderLineCount": 0
    },
    {
      "id": 132,
      "userUsername": "admin_user",
      "orderDate": "2018-4-12",
      "totalAmount": "415.00",
      "depositeAmount": 0,
      "deliveryDate": "2018-5-18",
      "measureDate": "2018-4-2",
      "orderStatus": 3,
      "mountExist": false,
      "orderNumber": "SN521",
      "tailorOrderLineCount": 0
    },
    {
      "id": 142,
      "userUsername": "admin_user",
      "orderDate": "2018-4-12",
      "totalAmount": "273.00",
      "depositeAmount": 0,
      "deliveryDate": "2018-4-2",
      "measureDate": "2018-4-6",
      "orderStatus": 3,
      "mountExist": false,
      "orderNumber": "SN521",
      "tailorOrderLineCount": 0
    },
    {
      "id": 152,
      "userUsername": "admin_user",
      "orderDate": "2018-4-12",
      "totalAmount": "977.00",
      "depositeAmount": 0,
      "deliveryDate": "2018-5-3",
      "measureDate": "2018-4-18",
      "orderStatus": 3,
      "mountExist": false,
      "orderNumber": "SN521",
      "tailorOrderLineCount": 0
    },
    {
      "id": 162,
      "userUsername": "admin_user",
      "orderDate": "2018-4-12",
      "totalAmount": "1184.00",
      "depositeAmount": 0,
      "deliveryDate": "2018-4-17",
      "measureDate": "2018-4-15",
      "orderStatus": 3,
      "mountExist": false,
      "orderNumber": "SN521",
      "tailorOrderLineCount": 0
    },
    {
      "id": 172,
      "userUsername": "admin_user",
      "orderDate": "2018-4-12",
      "totalAmount": "400.00",
      "depositeAmount": 0,
      "deliveryDate": "2018-4-5",
      "measureDate": "2018-4-18",
      "orderStatus": 3,
      "mountExist": false,
      "orderNumber": "SN521",
      "tailorOrderLineCount": 0
    },
    {
      "id": 182,
      "userUsername": "admin_user",
      "orderDate": "2018-4-12",
      "totalAmount": "1125.00",
      "depositeAmount": 0,
      "deliveryDate": "2018-5-7",
      "measureDate": "2018-4-19",
      "orderStatus": 3,
      "mountExist": false,
      "orderNumber": "SN521",
      "tailorOrderLineCount": 0
    },
    {
      "id": 192,
      "userUsername": "admin_user",
      "orderDate": "2018-4-12",
      "totalAmount": "799.00",
      "depositeAmount": 0,
      "deliveryDate": "2018-4-1",
      "measureDate": "2018-4-3",
      "orderStatus": 3,
      "mountExist": false,
      "orderNumber": "SN521",
      "tailorOrderLineCount": 0
    },
    {
      "id": 202,
      "userUsername": "admin_user",
      "orderDate": "2018-4-12",
      "totalAmount": "1113.00",
      "depositeAmount": 0,
      "deliveryDate": "2018-4-11",
      "measureDate": "2018-4-20",
      "orderStatus": 3,
      "mountExist": false,
      "orderNumber": "SN521",
      "tailorOrderLineCount": 0
    },
    {
      "id": 212,
      "userUsername": "admin_user",
      "orderDate": "2018-4-12",
      "totalAmount": "291.00",
      "depositeAmount": 0,
      "deliveryDate": "2018-5-15",
      "measureDate": "2018-4-16",
      "orderStatus": 3,
      "mountExist": false,
      "orderNumber": "SN521",
      "tailorOrderLineCount": 0
    },
    {
      "id": 222,
      "userUsername": "admin_user",
      "orderDate": "2018-4-12",
      "totalAmount": "307.00",
      "depositeAmount": 0,
      "deliveryDate": "2018-5-16",
      "measureDate": "2018-4-16",
      "orderStatus": 3,
      "mountExist": false,
      "orderNumber": "SN521",
      "tailorOrderLineCount": 0
    },
    {
      "id": 232,
      "userUsername": "admin_user",
      "orderDate": "2018-4-12",
      "totalAmount": "499.00",
      "depositeAmount": 0,
      "deliveryDate": "2018-5-16",
      "measureDate": "2018-4-11",
      "orderStatus": 3,
      "mountExist": false,
      "orderNumber": "SN521",
      "tailorOrderLineCount": 0
    },
    {
      "id": 242,
      "userUsername": "admin_user",
      "orderDate": "2018-4-12",
      "totalAmount": "603.00",
      "depositeAmount": 0,
      "deliveryDate": "2018-4-2",
      "measureDate": "2018-4-12",
      "orderStatus": 3,
      "mountExist": false,
      "orderNumber": "SN521",
      "tailorOrderLineCount": 0
    },
    {
      "id": 252,
      "userUsername": "admin_user",
      "orderDate": "2018-4-12",
      "totalAmount": "1034.00",
      "depositeAmount": 0,
      "deliveryDate": "2018-5-18",
      "measureDate": "2018-4-18",
      "orderStatus": 3,
      "mountExist": false,
      "orderNumber": "SN521",
      "tailorOrderLineCount": 0
    },
    {
      "id": 262,
      "userUsername": "admin_user",
      "orderDate": "2018-4-12",
      "totalAmount": "242.00",
      "depositeAmount": 0,
      "deliveryDate": "2018-5-8",
      "measureDate": "2018-4-10",
      "orderStatus": 3,
      "mountExist": false,
      "orderNumber": "SN521",
      "tailorOrderLineCount": 0
    },
    {
      "id": 272,
      "userUsername": "admin_user",
      "orderDate": "2018-4-12",
      "totalAmount": "485.00",
      "depositeAmount": 0,
      "deliveryDate": "2018-4-4",
      "measureDate": "2018-4-14",
      "orderStatus": 3,
      "mountExist": false,
      "orderNumber": "SN521",
      "tailorOrderLineCount": 0
    },
    {
      "id": 282,
      "userUsername": "admin_user",
      "orderDate": "2018-4-12",
      "totalAmount": "644.00",
      "depositeAmount": 0,
      "deliveryDate": "2018-5-8",
      "measureDate": "2018-4-20",
      "orderStatus": 3,
      "mountExist": false,
      "orderNumber": "SN521",
      "tailorOrderLineCount": 0
    },
    {
      "id": 292,
      "userUsername": "admin_user",
      "orderDate": "2018-4-12",
      "totalAmount": "1006.00",
      "depositeAmount": 0,
      "deliveryDate": "2018-4-4",
      "measureDate": "2018-4-19",
      "orderStatus": 3,
      "mountExist": false,
      "orderNumber": "SN521",
      "tailorOrderLineCount": 0
    }
  ]
}


var postUrl = "https://measure-notebook-api.herokuapp.com/order/update";
var success = 0;
var err = 0;

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
    function (error,response) {
    if(response){
      success++;
      if(index === orders.orderLineDetailList.length-1){
        console.log("Success post orders count is: ",success);
        console.log("Failed post orders count is: ",err);
      }
    }
      if(error) {
      err++;
        if(index === orders.orderLineDetailList.length-1){
          console.log("Success post orders count is: ",success);
          console.log("Failed post orders count is: ",err);
        }
      }
    }
  )
});


