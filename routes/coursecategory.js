const express = require('express')
const router = express.Router()
const dbs = require('./db')
const svgCaptcha = require('svg-captcha');
const ObjectId = require('mongodb').ObjectId;
const nocache = require('nocache')


router.get('/programming', async (req, res) => {
    let database = await dbs.getdatabase()
    const collection = database.collection('course')
    const cursor = collection.find({category:"programming"})
    let list = await cursor.toArray()

    let message = req.session.message || null;
    req.session.message = null;

    res.render('programming', { list, message: message });

})


router.get('/serverside', async (req, res) => {
    let database = await dbs.getdatabase()
    const collection = database.collection('course')
    const cursor = collection.find({category:"serverside"})
    let list = await cursor.toArray()

    let message = req.session.message || null;
    req.session.message = null;

    res.render('serverside', { list, message: message });

})


router.get('/htmlcourse', async (req, res) => {


    res.render('htmlcourse');

})


router.get('/jscourse', async (req, res) => {


    res.render('jscourse');

})

module.exports = router