const mongodb = require('mongodb');

const mongodbClient = mongodb.MongoClient;
const connectionUrl = 'mongodb://127.0.0.1:27017';
const databaseName = 'task-manager';

mongodbClient.connect(connectionUrl,{useNewUrlParser:true, useUnifiedTopology: true },(error,client)=>{
    if (error){
        return console.log('an error occurred try later');
    }

    const db = client.db(databaseName);

    db.collection('users').insertOne({
        name:'daniel',
        age:27
    })
    db.collection('users').insertMany([
        {
            name:'mbuthia',
            age:28
        },
        {
            name:"vero",
            age:25
        }
    ],{},(error,result)=>{
        if (error){
            return console.log('an error occurred');
        }
        console.log(result.ops)
    })
})
