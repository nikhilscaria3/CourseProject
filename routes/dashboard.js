const express = require('express')
const router = express.Router()
const dbs = require('./db')
const svgCaptcha = require('svg-captcha');
const ObjectId = require('mongodb').ObjectId;
const nocache = require('nocache')

router.get('/dashboard',(req,res)=>{
    res.render('dashboard')
})

module.exports = router