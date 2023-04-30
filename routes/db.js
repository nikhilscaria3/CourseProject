const mongodb = require('mongodb')
const MongoClient = mongodb.MongoClient
const ObjectId = mongodb.ObjectId

let database;

async function getdatabase(){
    const client = await MongoClient.connect('mongodb://127.0.0.1:27017/register')
    database = client.db('register');

    if(!database){
        console.log('sorry');
    }else{
        console.log('successfully');
    }
return database

} 

module.exports = {
    getdatabase,
    ObjectId
}
















