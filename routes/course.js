const express = require('express')
const router = express.Router()
const dbs = require('./db')
const svgCaptcha = require('svg-captcha');
const ObjectId = require('mongodb').ObjectId;
const nocache = require('nocache')
const multer = require('multer');


const isLoggedIn = (req, res, next) => {
  if (req.session.loggedIn) {
    next();
  } else {
    res.redirect('/adminlogin');
  }
};


router.get('', isLoggedIn, async (req, res) => { // handle the route without a trailing slash
  let database = await dbs.getdatabase();
  const collection = database.collection('course');
  const cursor = collection.find({});
  let list = await cursor.toArray();

  let message = req.session.message || null; // get the message from the session, or set it to null if not present
  req.session.message = null; // clear the message from the session
  res.render('course', { list, message }); // set message to null initially
});

router.get('/', async (req, res) => { // handle the route with a trailing slash
  res.redirect(301, '/course'); // redirect to the route without a trailing slash
});
// router.post('/', async (req, res) => {
//     try {
//         let database = await dbs.getdatabase();
//         const collection = database.collection('course');
//         let user = { course: req.body.course, duration: req.body.duration, description: req.body.description };
//         await collection.insertOne(user);

//         // fetch the updated list from the database
//         const cursor = collection.find({});
//         let list = await cursor.toArray();

//         req.session.message = 'Successfully Added';
//         return res.render('course', { list, message: req.session.message });
//     } catch (error) {
//         console.error(error);
//         req.session.message = 'Error adding course';
//         return res.render('course', { list: [], message: req.session.message });
//     }
// });

router.post('/', nocache(), async (req, res) => {
  try {
    let database = await dbs.getdatabase();
    const collection = database.collection('course');
    let user = { course: req.body.course, duration: req.body.duration, description: req.body.description, link: req.body.link, image: req.body.image, category: req.body.category };
    await collection.insertOne(user);

    req.session.message = 'Successfully Added';
    return res.redirect('/course'); // redirect to the GET handler for the course page
  } catch (error) {
    console.error(error);
    req.session.message = 'Error adding course';
    return res.render('course', { list: [], message: req.session.message });
  }
});



module.exports = router

