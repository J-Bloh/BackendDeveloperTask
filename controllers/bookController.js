/*
    Books control logic
*/
const sql = require('../database/bookSQL');

// Responses
const sendBadRequest = (res) => {
    res.statusCode = 400;
    res.json();
    console.log("Bad request");
}
const sendSuccessfulRequest = (res,data) => {
    res.statusCode = 200;
    res.json(data);
    console.log("Successful request");
}
const sendSuccessfulDelete = (res) => {
    res.statusCode = 204;
    res.json();
    console.log("Successful delete");
}
const sendNotFound = (res) => {
    res.statusCode = 404;
    res.json();
    console.log("Not found...");
}
const logServerError = (err) => {
    console.log("Error in server: " + err);
}

module.exports = {
    
    fetch: async (req, res) => {
        console.log("fetch started ...");        
        try {
           let {author, year, publisher} = req.query;
           let c = await sql.fetchBook({author, year, publisher});
           sendSuccessfulRequest(res,c);
        }
        catch (err) {
            logServerError(err);
        }
    },
    fetchByID: async (req, res) => {
        console.log("fetchByID started ...");        
        try {
            const id = req.params.id;            
            const book = await sql.fetchSingleBook(id);
            if( !book ){
                sendNotFound(res);
                return;
            }
            console.log(book);
            sendSuccessfulRequest(res, book);
        }
        catch (err) {
            logServerError(err);            
        }
    },
    insert: async (req, res) => {
        console.log("insert started ...");
        try {           
            const {title, author, year, publisher, description} = req.body;
            const book = await sql.checkIfBookExist({title,author,year});
            if( book ){
                sendBadRequest(res);
                console.log("Book allready exist")
                return;
            }
            let c = await sql.insertBook({title, author, year, publisher, description});
            console.log(c);
            sendSuccessfulRequest(res, {id:c});
        }
        catch (err) {
            logServerError(err);
        }
    },
    delete: async (req, res) => {
        console.log("delete started ..."); 
        try {
            const id = req.params.id;  
            const bookExist = await sql.fetchSingleBook(id);
            if( !bookExist ){//Not exist
                sendNotFound(res);
                return;   
            }
            let c = await sql.deleteBook(id);
            sendSuccessfulDelete(res);
        }
        catch (err) {
            logServerError(err);
        }
    }
}
