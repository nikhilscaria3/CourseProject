const express = require('express');
const router = express.Router();
const dbs = require('./db');
const bcrypt = require('bcrypt');
const svgCaptcha = require('svg-captcha');
const ObjectId = require('mongodb').ObjectId;

router.get('/',(req,res)=>{
    res.render('index')
})

module.exports = router