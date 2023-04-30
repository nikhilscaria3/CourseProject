const express = require('express')
const router = express.Router()
const dbs = require('./db')
const svgCaptcha = require('svg-captcha');
const ObjectId = require('mongodb').ObjectId;
const nocache = require('nocache')


router.get('/', async (req, res) => {
    let database = await dbs.getdatabase()
    const collection = database.collection('course')
    const cursor = collection.find({category:"serverside"})
    let list2 = await cursor.toArray()

    let message = req.session.message || null;
    req.session.message = null;

    res.render('interview', { list2, message: message });

})

router.get('/htmlcourse', async (req, res) => {


    res.render('htmlcourse');

})
module.exports = router