const Fuse = require('fuse.js');
const express = require('express')
const router = express.Router()
const dbs = require('./db')

router.get('/', async(req, res) => {
    let database = await dbs.getdatabase()
    const collection = database.collection('course')
    const cursor = collection.find({})
    let list = await cursor.toArray()
    const options = {
        keys: ['course', 'duration'],
        threshold: 0.3,
    };
    const fuse = new Fuse(list, options);
    const query = req.query.q;
    const result = fuse.search(query);
    res.json(result);
});

module.exports = router


