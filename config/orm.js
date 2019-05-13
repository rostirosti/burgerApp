// Import MySQL connection.
const connection = require('../config/connection.js');

// Object for all our SQL statement functions.
const orm = {
  all: function(tableInput, cb) {
    connection.query('SELECT * FROM ??', tableInput, function(err, result) {
      if (err) {
        throw err;
      }
      cb(result);
    });
  },
//   create: function(table, cols, vals, cb) {
//     const queryString = 'INSERT INTO ?? (??) VALUES (?)'

//     connection.query(queryString, [table, cols, vals], function(err, result) {
//       if (err) {
//         throw err;
//       }

//       cb(result);
//     });
//   },
//   // An example of objColVals would be {name: panther, sleepy: true}

// var updateStock = function () {
//   console.log("Updating all quantities...\n");
//   let query = connection.query(
//       "UPDATE products SET ? WHERE ?",
//       [{
//               stock_quantity: quant_num
//           },
//           {
//               item_id: prod_id
//           }
//       ],
//       function (err, res) {
//           console.log(res.affectedRows + " row updated!\n");

//       }
//   );

// }


  update: function(table, objColVals, condition, cb) {
    const queryString = 'UPDATE ? SET ? WHERE ?'

    connection.query(queryString, [table, objColVals, condition], function(err, result) {
      if (err) {
        throw err;
      }

      cb(result);
    });
  },
//   delete: function(table, condition, cb) {
//     var queryString = "DELETE FROM ?? WHERE ?";

//     connection.query(queryString, [table, condition], function(err, result) {
//       if (err) {
//         throw err;
//       }

//       cb(result);
//     });
//   }
};

// Export the orm object for the model (cat.js).
module.exports = orm;
