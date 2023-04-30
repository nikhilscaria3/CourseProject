const express = require('express');
const router = express.Router();
const dbs = require('./db')

router.get('/', async (req, res) => {
    let database = await dbs.getdatabase()
    const collection = database.collection('userdatabase')
    const cursor = collection.find({})
    let list = await cursor.toArray()

    let message = req.session.message || null;
    req.session.message = null;

    let editdata = null; // Define editdata and assign null to it

    if (req.query.edit_id) {
        const edit_id = req.query.edit_id;
        editdata = await collection.findOne({ _id: new ObjectId(edit_id) });
    }


    if (req.query.delete_id) {
        await collection.deleteOne({ _id: new ObjectId(req.query.delete_id) })
        return res.redirect('/user');
    }

    res.render('user', { list, message: message, editdata: editdata || {} });

})

module.exports = router