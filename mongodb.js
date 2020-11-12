const {MongoClient,ObjectID} = require('mongodb');

const databaseUrl = 'mongodb://127.0.0.1:27017';
const databaseName = 'task-manager';

const id = new ObjectID();
console.log(id);
console.log(id.getTimestamp());

MongoClient.connect(databaseUrl,{useUnifiedTopology: true},(error,client)=>{
  if(error){
      return console.log('Unable to connect to database');
  }
  const db = client.db(databaseName);
  // db.collection('users').insertOne({
  //     name:'Daniel',
  //     age:26
  // },(error,result)=>{
  //   if(error){
  //    return console.log('error connecting');
  //   }
  //   console.log(result.ops);
   
  // })
  // db.collection('tasks').insertMany([
  //   {
  //     description:'test',
  //     completed:false
  // },{
  //   description:'It again',
  //   completed:true
  // },
  // {
  //   description:'doing it',
  //   completed:true
  // }
  // ],(error,result)=>{
  //   if(error){
  //     return console.log('insert Many failed')
  //   }
  //   console.log(result.ops)
  // })
  client.close();
});