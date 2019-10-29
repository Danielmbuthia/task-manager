const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

const databaseUrl = 'mongodb://127.0.0.1:27017';
const databaseName = 'task-manager';

MongoClient.connect(databaseUrl,{useUnifiedTopology: true},(error,client)=>{
  if(error){
      return console.log('Unable to connect to database');
  }
  const db = client.db(databaseName);
  db.collection('users').insertOne({
      name:'Daniel',
      age:26
  })
  client.close();
});