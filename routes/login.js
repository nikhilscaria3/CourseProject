const express = require('express');
const router = express.Router();
const dbs = require('./db');
const bcrypt = require('bcrypt');
const ObjectId = require('mongodb').ObjectId;
const nocache = require('nocache')

router.get('/', nocache(), (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/homepage');
  } else {
    let message = req.session.message || null;
    req.session.message = null;
    // res.render('login', { message: null });
    // res.render(`${viewsDir}/user/homepage`, { message: null });
    res.render('login', { message: null });
  }  
});



router.post('/', async (req, res) => {
  const database = await dbs.getdatabase();
  const collection = database.collection('userdatabase');
  const username = req.body.username;
  const password = req.body.password;
  const user = await collection.findOne({ username });
  if (user && await bcrypt.compare(password, user.password)) {
    req.session.loggedIn = true;
    req.session.user = user;
    res.redirect('/homepage');
  } else {
    req.session.message = 'Invalid Password or Username';
    return res.render('login', { message: req.session.message });
  }

});
// router.post('/', async (req, res) => {
//   const database = await dbs.getdatabase();
//   const collection = database.collection('userdatabase');
//   const username = req.body.username;
//   const password = req.body.password;
//   const user = await collection.findOne({ username });
//   if (user && await bcrypt.compare(password, user.password)) {
//     req.session.loggedIn = true;
//     req.session.user = user;
//     res.redirect('/home'); // redirect to the GET route for the home page
//   } else {
//     req.session.message = 'Invalid Password or Username';
//     res.redirect('/login');
//   }
// });

// router.post('/login', async (req, res) => {
//     const database = await dbs.getdatabase();
//     const collection = database.collection('userdatabase');
//     const username = req.body.username;
//     const password = req.body.password;
//     const user = await collection.findOne({ username });
//     if (user && await bcrypt.compare(password, user.password)) {
//       req.session.loggedIn = true;
//       req.session.user = user;
//       res.redirect('/');
//     } else {
//       req.session.message = 'Invalid Password or Username';
//       return res.redirect('/login');
//     }
//   });

module.exports = router;




// const express = require('express');
// const router = express.Router();
// const dbs = require('./db');
// const bcrypt = require('bcrypt');
// const ObjectId = require('mongodb').ObjectId;
// const nocache = require('nocache')

// // // Use middleware to check if the user is logged in before accessing the home page
// const isLoggedIn = (req, res, next) => {
//   if (req.session.loggedIn) {
//     next();
//   } else {
//     res.redirect('/login');
//   }
// };

// //Render the login page
// router.get('/', nocache(), (req, res) => {
//   let message = req.session.message || null; // get the message from the session, or set it to null if not present
//   req.session.message = null;
//   res.render('login', { message: message });
// });



// //Handle the login request
// router.post('/', nocache(), async (req, res) => {
//   const database = await dbs.getdatabase();
//   const collection = database.collection('userdatabase');
//   const username = req.body.username;
//   const password = req.body.password;
//   const user = await collection.findOne({ username });
//   if (user && await bcrypt.compare(password, user.password)) {
//     req.session.loggedIn = true;
//     req.session.user = user;
//     res.redirect('/home');
//   } else {
//     req.session.message = 'Invalid Password or Username';
//     res.redirect('/login');
//   }
// });

// // Render the home page
// router.get('/home', isLoggedIn, (req, res) => {
//   res.render('home', { user: req.session.user });
// });

// module.exports = router;

// const express = require('express');
// const router = express.Router();
// const dbs = require('./db');
// const bcrypt = require('bcrypt');
// const ObjectId = require('mongodb').ObjectId;
// const nocache = require('nocache')

// // // Use middleware to check if the user is logged in before accessing the home page

// //Render the login page
// router.get('/', nocache(), (req, res) => {
//   let message = req.session.message || null; // get the message from the session, or set it to null if not present
//   req.session.message = null;
//   res.render('login', { message: message });
// });

// //Handle the login request
// router.post('/', nocache(), async (req, res) => {
//   const database = await dbs.getdatabase();
//   const collection = database.collection('userdatabase');
//   const username = req.body.username;
//   const password = req.body.password;
//   const user = await collection.findOne({ username });
//   if (user && await bcrypt.compare(password, user.password)) {
//     c
//     req.session.user = user;
//     res.redirect('/home');
//   } else {
//     req.session.message = 'Invalid Password or Username';
//     res.redirect('/login');
//   }
// });

// // Render the home page


// module.exports = router;
