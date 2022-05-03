/*
    booksDB.js -- Database object configuration and connection with executors.
*/
var sqlite3 = require('sqlite3').verbose();
const path = require('path');
var db = new sqlite3.Database(path.resolve(__dirname,'./books.db'));

const executeRUN = (query, params) => {
    console.log("Params: " + params);
    console.log("Query: " + query);
    return new Promise((resolve, reject) => {
        db.run(query, params, function (error, results, fields) {
            error ? reject(error) : resolve(this.lastID);//Check if returning id is ok with multiple threads. Get id with new query if its not safe..
        });//SQLite allows one writer at any instant in time   
    })
}
const executeALL = (query, params) => {
    console.log("Params: " + params);
    console.log("Query: " + query);
    return new Promise((resolve, reject) => {
        db.all(query, params, function (error, results, fields) {
            error ? reject(error) : resolve(results);
        });
    })
}
const executeGET = (query, params) => {
    console.log("Params: " + params);
    console.log("Query: " + query);
    return new Promise((resolve, reject) => {
        db.get(query, params, function (error, results, fields) {
            error ? reject(error) : resolve(results);
        });
    })
}

module.exports = {db, executeRUN, executeGET, executeALL};