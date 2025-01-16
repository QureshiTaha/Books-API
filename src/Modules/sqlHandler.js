const database = require('./config');
con = database();

module.exports = {
  query: async function (sqlQuery) {
    try {
      const getData = await new Promise((resolve, reject) => {
        if (!sqlQuery || typeof sqlQuery === 'undefined')
          reject(`Validation Error sql Query Not Defines.\n sqlQuery is RequiiredFields`);
        con.query(sqlQuery, function (err, result, fields) {
          if (err) {
            reject(err);
          } else {
            resolve(result);
          }
        });
      });
      return getData;
    } catch (error) {
      console.log('\n=-=-=-=-=-=-=-\nSQLHandlerError\n\n', error, '\nSQLHandlerError\n=-=-=-=-=-=-=-\n');
      throw new Error(error);
    }
  },
  queryWithParams: async function (sqlQuery, params = []) {
    try {
      const getData = await new Promise((resolve, reject) => {
        if (!sqlQuery || typeof sqlQuery === 'undefined') {
          return reject('Validation Error: SQL Query Not Defined. sqlQuery is Required.');
        }

        con.query(sqlQuery, params, (err, result) => {
          if (err) {
            return reject(err);
          }
          resolve(result);
        });
      });
      return getData;
    } catch (error) {
      console.error('\n=-=-=-=-=-=-=-\nSQLHandlerError\n', error, '\n=-=-=-=-=-=-=-\n');
      throw new Error(error.message || 'SQL Query Execution Error');
    }
  }
};
