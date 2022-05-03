/* 
 *  Create & "init" content
 */

-- BOOKS --
BEGIN TRANSACTION;

CREATE TABLE IF NOT EXISTS books (
    id INTEGER NOT NULL PRIMARY KEY, 
    title TEXT NOT NULL, 
    author TEXT NOT NULL, 
    year INTEGER NOT NULL, 
    publisher TEXT, 
    description TEXT, 
    UNIQUE(title,author,year)
);

COMMIT;