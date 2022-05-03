/*
    Books SQL-Querys
*/
const { executeALL, executeRUN, executeGET } = require('./booksDB');

module.exports = {
    
    insertBook: ({title, author, year, publisher, description}) => {
        const query = "INSERT INTO books (title, author, year, publisher, description) values (?,?,?,?,?)";
        return executeRUN(query, [title, author, year, publisher, description]);
    },
    deleteBook: (id) => {
        const query = "DELETE FROM books WHERE id = ?";
        return executeRUN(query, [id]);
    },
    fetchSingleBook: (id) => {
        const query = "SELECT * FROM books WHERE id = ?";
        return executeGET(query, [id]);
    },
    fetchBook: ({author, year, publisher}) => {        
       let query = "SELECT * FROM books WHERE 1=1";
       let vars = []
       if ( author ){
            query = query + " AND author = ?";
            vars.push(author);
       }
       if ( year ){
           query = query + " AND year = ?";
           vars.push(year);
       } 
       if ( publisher ) {
           query = query + " AND publisher = ?";
           vars.push(publisher);
       }
       query = query + " COLLATE NOCASE";        
       return executeALL(query, vars);
    },
     checkIfBookExist: ({title, author, year}) => {        
        const query = "SELECT * FROM books WHERE 1=1 AND title = ? AND author = ? AND year = ? COLLATE NOCASE";
        return executeGET(query, [title, author, year]);
     }
}