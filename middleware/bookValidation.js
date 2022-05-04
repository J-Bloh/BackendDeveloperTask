/*
    bookValidation.js - Validation for query, ID param and JSON-object attributes
*/

/*
    Query
*/
const validateQuery = (req,res,next) =>{
    try {
        const keyRules = ['author', 'year', 'publisher'];
        if (checkKeyRules(req.query, keyRules)) {
            res.sendStatus(400);
            return;
        }

        const { author, year, publisher } = req.query;
        let errors = [];
        if (author && !isNaN(author) || author === "")
            errors.push("author");

        if (year || year === "") {
            let y = year.replace(',', '.')
            if (!(y % 1 == 0))
                errors.push("year");
            else
                req.query.year = Math.trunc(y);
        }
        if (publisher && !isNaN(publisher) || publisher === "")
            errors.push("publisher")

        if (errors.length > 0) {
            console.log("Error in query: ", errors.join(","))
            res.sendStatus(400);
            return;
        }
        next();
    } catch (error) {
        console.log(error)
        res.sendStatus(500);
        return;
    }
    
}
/*
    JSON-body
*/
const validateBody = (req,res,next) => {
    try {
        const keyRules = ['title', 'author', 'year', 'publisher', 'description'];
        if (checkKeyRules(req.body, keyRules)) {
            res.sendStatus(400);
            return;
        }
        const { title, author, year, publisher, description } = req.body;

        let errors = [];
        if (!title || (title && !isNaN(title)))//required
            errors.push("title");
        if (!author || (author && !isNaN(author)))//required 
            errors.push("author");
        if (!year || (year && !(year % 1 == 0)))//required 
            errors.push("year");
        if (publisher && !isNaN(publisher) || publisher === "")//optional
            errors.push("publisher")
        if (description && !isNaN(description) || description === "")//optional 
            errors.push("description")
        if (errors.length > 0) {
            console.log("Error in fields: ", errors.join(","))
            res.sendStatus(400);
            return;
        }
        req.body.year = Math.trunc(year);
        next();      
    } catch (error) {
        console.log(error)
        res.sendStatus(500);
        return
    }
      
}
/*
    Param-ID
*/
const validateID = (req,res,next) => { 
    try {
        let id = req.params.id
        id = id.replace(',', '.'); //if finnish expression allowed
        if (!id) {
            console.log("ID not included");
            res.sendStatus(400);
            return;
        }
        if (id % 1 != 0) {
            console.log("ID is not a number or in right format");
            res.sendStatus(404);
            return;
        }
        if (id < 1) {
            console.log("Error: Negative id");
            res.sendStatus(404);
            return;
        }
        req.params.id = Math.trunc(id);
        next(); 
    } catch (error) {
        console.log(error)
        res.sendStatus(500);
        return
    }
}

//Check if object contains right attributes
const checkKeyRules = (values, keyRules) => {     
    const keys = Object.keys(values);
    const badKeys = keys.filter(key => !keyRules.includes(key));
    if( badKeys.length > 0){
        console.log("Keys not allowed: ", badKeys.join(","));
        return true;
    }
    return false;
}

module.exports = {
    validateBody,validateID,validateQuery
}