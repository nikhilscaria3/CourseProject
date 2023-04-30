const express = require('express')
const router = express.Router()
const dbs = require('./db')


router.get('/', async (req, res) => {


    res.render('htmlcourse');

})


router.get('/', async (req, res) => {


    res.render('jscourse');

})

module.exports = router