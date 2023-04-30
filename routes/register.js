const express = require('express');
const router = express.Router();
const dbs = require('./db');
const bcrypt = require('bcrypt');
const svgCaptcha = require('svg-captcha');
const ObjectId = require('mongodb').ObjectId;

router.get('/', async (req, res) => {
    let database = await dbs.getdatabase()
    const collection = database.collection('userdatabase')
    const cursor = collection.find({})
    let list = await cursor.toArray()
  
    let message = req.session.message || null; // get the message from the session, or set it to null if not present
    req.session.message = null; // clear the message from the session
  
    res.render('register', { list, message:null })
  })
  
  
  router.get('/captcha', (req, res) => {
    const captcha = svgCaptcha.create();
    req.session.captcha = captcha.text; // Save the captcha text to session
    res.type('svg').send(captcha.data);
  });
  
  
  router.post('/', async (req, res) => {
    console.log('captcha:', req.body.captcha); // Debugging line
    console.log('session captcha:', req.session.captcha); // Debugging line
    let database = await dbs.getdatabase();
    const collection = database.collection('userdatabase');
  
    const saltRounds = 10; // define the number of salt rounds for bcrypt
    const hashedPassword = await bcrypt.hash(req.body.password, saltRounds); // hash the password using bcrypt
    const { captcha } = req.body;
    if (captcha === req.session.captcha) { // validate the captcha input
      let user = { username: req.body.username, password: hashedPassword };
      await collection.insertOne(user);
      req.session.message = 'Successfully Registered';
      return res.render('register', { message: req.session.message });
    } else {
  
      req.session.message = 'Incorrect captcha';
      return res.render('register', { message: req.session.message });
    }
  });

module.exports = router;
