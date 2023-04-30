const express = require('express');
const router = express.Router();
const dbs = require('./db');
const bcrypt = require('bcrypt');
const ObjectId = require('mongodb').ObjectId;
const nocache = require('nocache');



router.get('/',nocache(), (req, res) => {
    if (req.session.loggedIn) {
      res.redirect('/admin');
    } else {
      let message = req.session.message || null; // get the message from the session, or set it to null if not present
      req.session.message = null;
      res.render('adminlogin', { message });
    }
  });
  


  router.post('/', nocache(),async (req, res) => {
    const database = await dbs.getdatabase();
    const collection = database.collection('admin');
    const username = req.body.username;
    const password = req.body.password;
    const user = await collection.findOne({ username });
    if (user && await bcrypt.compare(password, user.password)) {
      req.session.loggedIn = true;
      req.session.user = user;
      res.redirect('/admin');
    } else {
      req.session.message = 'Invalid Password or Username';
      return res.render('adminlogin', { message: req.session.message });
    }
  
  });

  
  
module.exports = router;
