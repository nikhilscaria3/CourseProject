// const express = require('express')
// const router = express.Router()
// const app = express()
// const dbs = require('./db')
// const ObjectId = require('mongodb').ObjectId


// router.get('/', async (req, res) => {
//     let database = await dbs.getdatabase()
//     const collection = database.collection('userdatabase')
//     const cursor = collection.find({})
//     let list = await cursor.toArray()
  
//     let message = req.session.message || null;
//     req.session.message = null;
  
//     let editdata = null; // Define editdata and assign null to it
  
//     if (req.query.edit_id) {
//       const edit_id = req.query.edit_id;
//       editdata = await collection.findOne({ _id: new ObjectId(edit_id) });
//     }
  
//     if (req.query.delete_id) {
//       await collection.deleteOne({ _id: new ObjectId(req.query.delete_id) })
//       return res.redirect('/edit');
//     }
//     res.render('edit', { list, message, editdata: editdata || {} }) // Pass editdata as an empty object if it is null
//   })
  
//   router.post('/', async (req, res) => {
//     let database = await dbs.getdatabase();
//     const collection = database.collection('userdatabase');
//     let edit_id = req.body.id;
//     let username = req.body.username;
//     let password = req.body.password;
//     await collection.updateOne(
//       { _id: new ObjectId(edit_id) },
//       { $set: { username, password } }
//     );
//     req.session.message = 'Edited Successfully';
//     return res.redirect('/edit');
//   })
  
  

//   module.exports = router