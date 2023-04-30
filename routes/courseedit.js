const express = require('express')
const router = express.Router()
const dbs = require('./db')
const ObjectId = require('mongodb').ObjectId;

const isLoggedIn = (req, res, next) => {
    if (req.session.loggedIn) {
      next();
    } else {
      res.redirect('/adminlogin');
    }
  };
  

router.get('/', isLoggedIn ,async (req, res) => {
    let database = await dbs.getdatabase()
    const collection = database.collection('course')
    const cursor = collection.find({})
    let list = await cursor.toArray()

    let message = req.session.message || null;
    req.session.message = null;

    let editdata = null; // Define editdata and assign null to it

    // if (req.query.edit_id) {
    //     const edit_id = req.query.edit_id;
    //     editdata = await collection.findOne({ _id: new ObjectId(edit_id) });
    // }

    if (req.query.edit_id) {
        const edit_id = req.query.edit_id;
        const validIdRegex = /^[0-9a-fA-F]{24}$/;
        if (!validIdRegex.test(edit_id)) {
            // Handle the invalid ID here
        }
        editdata = await collection.findOne({ _id: new ObjectId(edit_id) });
    }


    if (req.query.delete_id) {
        await collection.deleteOne({ _id: new ObjectId(req.query.delete_id) })
        return res.redirect('/edit');
    }

    res.render('courseedit', { list, message: message, editdata: editdata || {} });

})


router.post('/', async (req, res) => {
    let database = await dbs.getdatabase();
    const collection = database.collection('course');
    let edit_id = req.body.id;
    let course = req.body.course;
    let duration = req.body.duration;
    let description = req.body.description;
    let link = req.body.link

    await collection.updateOne(
        { _id: new ObjectId(edit_id) },
        { $set: { course, duration, description, link ,category} }
    );
    req.session.message = 'Edited Successfully';
    return res.redirect('/edit');
})




module.exports = router