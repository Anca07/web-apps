var data = {
  "articleList": [
    {
      "articleId": 18809,
      "supplierId": [35005],
      "description": "PORTOCALE  TURCIA",
      "expirationDate": "2025-07-28",
      "articleClass": 221,
      "activ": false,
      "attributes": {
        "weight": 1,
        "packaging": "bucata",
        "assortment": "Bere"
      }
    },
    {
      "articleId": 26598,
      "supplierId": [25058],
      "description": " SEPARATOR CART10.5X24,100/",
      "expirationDate": "2024-06-08",
      "articleClass": 2111,
      "activ": true,
      "attributes": {
        "weight": 0.3,
        "packaging": "bucata",
        "assortment": "Sucuri de portocale"
      }
    },
    {
      "articleId": 51719,
      "supplierId": [55555],
      "description": "STORC.MANUAL CITRICE PROFESION",
      "expirationDate": "2021-02-13",
      "articleClass": 113,
      "activ": true,
      "attributes": {
        "weight": 5.2,
        "packaging": "bucata",
        "assortment": "Legume"
      }
    },
    {
      "articleId": 57670,
      "supplierId": [24876],
      "description": "5L TERRADENA",
      "expirationDate": "2019-04-03",
      "articleClass": 112,
      "activ": false,
      "attributes": {
        "weight": 2.5,
        "packaging": "bucata",
        "assortment": "Fructe"
      }
    },
    {
      "articleId": 61317,
      "supplierId": [20184],
      "description": "1.0L IZVOR MINUNILOR",
      "expirationDate": "2018-04-28",
      "articleClass": 3,
      "activ": false,
      "attributes": {
        "weight": 6.25,
        "packaging": "bax_6",
        "assortment": "Tutun"
      }
    }
  ],
 supplierList: [
  {
    "supplierId": 48948,
    "supplierName": "XAM SUPPLIER CO",
    "supplierCity": "TIMISOARA"
  },
  {
    "supplierId": 48632,
    "supplierName": "FAN SUPPLIER CO",
    "supplierCity": "BATTLE EAST SUS"
  },
  {
    "supplierId": 48883,
    "supplierName": "FRENCH SUPPLIER",
    "supplierCity": "IGHIEL"
  },
  {
    "supplierId": 48961,
    "supplierName": "TURKISH SUPPLIER",
    "supplierCity": "VOLUNTARI"
  },
  {
    "supplierId": 48447,
    "supplierName": "ELECTRO DISTRIBUTE",
    "supplierCity": "BUCURESTI"
  }
 ],
  orders: [
    {
      "articleId": 51719,
      "quantity": 8.0,
      "supplierId": 48447,
      "deliveryDate": "11/02/2020",
      "orderDate": "05/02/2020"
    },
    {
      "articleId": 26598,
      "quantity": 12.0,
      "supplierId": 48961,
      "deliveryDate": "01/02/2020",
      "orderDate": "29/01/2020"
    },
    {
      "articleId": 18809,
      "quantity": 12.0,
      "supplierId": 48948,
      "deliveryDate": "01/02/2020",
      "orderDate": "29/01/2020"
    },
    {
      "articleId": 18809,
      "quantity": 27.0,
      "supplierId": 48883,
      "deliveryDate": "06/02/2020",
      "orderDate": "03/02/2020"
    },
    {
      "articleId": 26598,
      "quantity": 12.0,
      "supplierId": 48632,
      "deliveryDate": "13/02/2020",
      "orderDate": "07/02/2020"
    }
  ],
  "articleClass": [
    {
      "classId": 1,
      "className": "Food",
      "parentId": 0
    },
    {
      "classId": 11,
      "className": "Fresh",
      "parentId": 1
    },
    {
      "classId": 111,
      "className": "Fish",
      "parentId": 11
    },
    {
      "classId": 112,
      "className": "Fructe",
      "parentId": 11
    },
    {
      "classId": 113,
      "className": "Legume",
      "parentId": 11
    },
    {
      "classId": 2,
      "className": "Drinks",
      "parentId": 0
    },
    {
      "classId": 21,
      "className": "Sucuri",
      "parentId": 2
    },
    {
      "classId": 22,
      "className": "Bauturi Alcoolice",
      "parentId": 2
    },
    {
      "classId": 221,
      "className": "Bere",
      "parentId": 22
    },
    {
      "classId": 3,
      "className": "Tutun",
      "parentId": 0
    },
    {
      "classId": 211,
      "className": "Sucuri Naturale",
      "parentId": 21
    },
    {
      "classId": 212,
      "className": "Sucuri Acidulate",
      "parentId": 21
    },
    {
      "classId": 2111,
      "className": "Sucuri de portocale",
      "parentId": 211
    },
    {
      "classId": 23,
      "className": "Apa",
      "parentId": 2
    }
  ]
};