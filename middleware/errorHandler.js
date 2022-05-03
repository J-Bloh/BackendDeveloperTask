
const handleJSON = (err, req, res, next) => {
    if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
        console.error("Bad Request");
        console.error("Error in JSON");
        return res.sendStatus(400);
    }
    next();
}
module.exports = {handleJSON};