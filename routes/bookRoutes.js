/*
    bookRoutes.js - routing for book table
*/
const express = require('express');
const router = express.Router();

const ctrl = require('../controllers/bookController');
const mw = require('../middleware/bookValidation')

router.route('/books').
    get(mw.validateQuery,ctrl.fetch).
    post(mw.validateBody,ctrl.insert);

router.route('/books/:id').
    get(mw.validateID,ctrl.fetchByID).
    delete(mw.validateID,ctrl.delete);
   
module.exports = router;