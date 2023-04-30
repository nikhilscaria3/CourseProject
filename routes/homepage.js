const express = require('express')
const router = express.Router()
const dbs = require('./db')
const svgCaptcha = require('svg-captcha');
const ObjectId = require('mongodb').ObjectId;
const nocache = require('nocache')


router.get('/', async (req, res) => {
    let database = await dbs.getdatabase()
    const collection = database.collection('course')
    const cursor = collection.find({category:"html and css"})
    let list2 = await cursor.toArray()

    let message = req.session.message || null;
    req.session.message = null;

    res.render('homepage', { list2, message: message });

})

router.get('/search', async (req, res) => {
    const database = await dbs.getdatabase();
    const collection = database.collection('programmingcourse');
    const search_id = req.query.search_id;
    const searchTerm = req.query.search_id;
    const cursor = collection.findOne({ _id: new ObjectId(search_id) });
    const results = await cursor.toArray();

    res.render('homepage', { results });
})

router.get('/image/:id', function(req, res) {
    MongoClient.connect(uri, function(err, client) {
      if (err) throw err;
      const db = client.db('register');
      const collection = db.collection('course');
      collection.findOne({ _id: ObjectId(req.params.id) }, function(err, result) {
        if (err) throw err;
        const stream = collection.find({ _id: ObjectId(req.params.id) }).stream();
        stream.on('data', function(item) {
          res.contentType(item.contentType);
          res.send(item.image.buffer);
          client.close();
        });
      });
    });
  });
  
  
router.get('/htmlcourse', async (req, res) => {


    res.render('htmlcourse');

})
module.exports = router