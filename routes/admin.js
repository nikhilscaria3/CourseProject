const express = require('express');
const router  = express.Router();
const dbs = require('./db');
const bcrypt = require('bcrypt');
const ObjectId = require('mongodb').ObjectId;
const nocache = require('nocache')


const isLoggedIn = (req, res, next) => {
    if (req.session.loggedIn) {
      next();
    } else {
      res.redirect('/adminlogin');
    }
  };

router.get('/',isLoggedIn,(req,res)=>{
    res.render('admin' ,{ user: req.session.user })
})

router.get('/',nocache(), (req, res) => {
  req.session.destroy();
  res.redirect('/adminlogin');
});

module.exports = router



