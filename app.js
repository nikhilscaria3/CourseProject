require('./globals');
const express = require('express')
const app = express()
const dbs = require('./routes/db')
const path = require('path')
const hbs = require('express-handlebars')
const bodyParser = require('body-parser')
const session = require('express-session')
const morgan = require('morgan');
const ObjectId = require('mongodb').ObjectId
const cookieParser = require('cookie-parser')
const fs = require('fs')

const adminloginroute = require('./routes/adminlogin')
const registerroute = require('./routes/register')
const loginroute = require('./routes/login')
const adminroute = require('./routes/admin')
const courseroute = require('./routes/course')
const courseedit = require('./routes/courseedit')
const dashboard = require('./routes/dashboard')
const userroute = require('./routes/user')
const homepageroute = require('./routes/homepage')
const programroute = require('./routes/programming')
const serverroute = require('./routes/serverside')
const htmlroute = require('./routes/htmlcourse')
const search = require('./routes/search')
const landingroute = require('./routes/landing')
const interviewroute = require('./routes/interview')
const nocache = require('nocache')


// configure session middleware
app.use(session({
  secret: 'secret-key',
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 600000 }
}));

app.use(function (req, res, next) {
  res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
  res.setHeader('Pragma', 'no-cache');
  res.setHeader('Expires', '0');
  next();
});


app.use(nocache())
// app.use(morgan('dev'));


app.set('view engine', 'hbs');
app.set('views', [path.join(__dirname, 'views'), path.join(__dirname, 'views/courses')]);
// app.set(express.static(path.join(__dirname + 'views')))



// configure middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'views')));

// app.use((req, _res, next) => {
//   if (req.app.get('dbs') === 'development') next(createError(404));
//   else next();
// });

// app.use((_req, res) => {
//   res.status(404);
//   res.render('error'), {
//     errorType: '404',
//     errorMessage: 'Not Found',
//   }
//   });



// app.use(express.static(path.join(__dirname, '../views/adminviews')));

const goToLoginIfNotAuth = (req, res, next) => {
  if(req.session.loggedIn){
    next()
  }else{
    res.redirect("/login")
  }
};

const goToLoginIfNotAut = (req, res, next) => {
  if(req.session.adminloggeddin){
    next()
  }else{
    res.redirect("/adminlogin")
  }
};


//---------------------------------CREATE-----------------------------------------

app.use('/register', registerroute)

//---------------------------------------EDIT----------------------------------------

// app.use('/edit', editroute)

///------------------------------------LOGIN-------------------------------------

app.use('/login', loginroute)


//-------------------------------------adminLogin------------------------------------------


app.use('/adminlogin', adminloginroute)


//-------------------------------------Admin------------------------------------------

app.use('/admin',goToLoginIfNotAut, adminroute)

//-------------------------------------COURSE------------------------------------------

app.use('/edit', goToLoginIfNotAut,courseedit)
// 
app.use('/course',goToLoginIfNotAut, courseroute)

app.use('/user', userroute)


app.use('/dashboard', dashboard)
app.use('/search', search)

app.use('/homepage', goToLoginIfNotAuth, homepageroute)
app.use('/htmlcourse', htmlroute)
app.use('/', landingroute)
app.use('/programming', programroute)
app.use('/serverside', serverroute)
app.use('/interview', interviewroute)
//----------------------------------------HOMEPAGE---------------------------------------

// app.get('/home', nocache(),(req, res) => {
//   if (req.session.loggedIn) {
//     res.redirect('/');
//   } else {
//     res.render('home');
//   }
// });
const isLoggedIn = (req, res, next) => {
  if (req.session.loggedIn) {
    next();
  } else {
    res.redirect('/login');
  }
};


app.get('/interview', async (req, res) => {


  res.render('interview');

})


app.get('/nodejs', async (req, res) => {


  res.render('nodejs');

})


app.get('/mongodb', async (req, res) => {


  res.render('mongodb');

})


app.get('/homepage', isLoggedIn, (req, res) => {
  res.render('homepage', { user: req.session.user });
});


app.get('/jscourse', async (req, res) => {


  res.render('jscourse');

})
app.get('/csscourse', async (req, res) => {


  res.render('csscourse');

})
app.get('/bootstrapcourse', async (req, res) => {


  res.render('bootstrapcourse');

})

// //------------------------------------signout---------------------------------

app.get('/signout', nocache(), (req, res) => {
  req.session.destroy();
  res.redirect('/login');
});

app.get('/logout', nocache(), (req, res) => {
  req.session.destroy();
  res.redirect('/adminlogin');
});

const port = process.env.PORT || 8000
app.listen(port, () => {
  console.log(`server is running ${port}`);
})








