/*
    bookRoutes.js - routing for book table
*/
var express = require('express');
var router = express.Router();

var ctrl = require('../controllers/bookController');
var mw = require('../middleware/bookValidation')

router.route('/books').
    get(mw.validateQuery,ctrl.fetch).
    post(mw.validateBody,ctrl.insert);

router.route('/books/:id').
    get(mw.validateID,ctrl.fetchByID).
    delete(mw.validateID,ctrl.delete);
   
module.exports = router;