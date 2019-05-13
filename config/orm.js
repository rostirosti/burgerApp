// Import MySQL connection.
const connection = require('../config/connection.js');

// extra function to help with the way I am doing the SQL query
const sqlObj = (ob) => {
  let arr = [];

  for (let key in ob) {
      let value = ob[key];
    
      if (Object.hasOwnProperty.call(ob, key)) {
       
          if (typeof value === "string" && value.indexOf(" ") >= 0) {
              value = "'" + value + "'";
          }

          arr.push(key + "=" + value);
      }
  }

  return arr.toString();
}


const orm = {
  all: function(tableInput, cb) {
    connection.query('SELECT * FROM ??', tableInput, function(err, result) {
      if (err) {
        throw err;
      }
      cb(result);
    });
  },


  create: function(table, cols, vals, cb) {
    const queryString = 'INSERT INTO ?? (??) VALUES (?)'

    connection.query(queryString, [table, cols, vals], function(err, result) {
      if (err) {
        throw err;
      }
      console.log(queryString);
      cb(result);
    });
  },


update: (table, objColVals, condition, callback) => {
  let queryString = "UPDATE " + table;

  queryString += " SET ";
  queryString += sqlObj(objColVals);
  queryString += " WHERE ";
  queryString += condition;
  console.log(queryString);
  connection.query(queryString, (err, results) => {
      if (err) throw err;

      callback(results);
      
  });
}

}


module.exports = orm;
