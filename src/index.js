const express = require('express');
require('./db/mongoose');   // connection to database
const bodyParser = require("body-parser");
const dotenv = require('dotenv');
dotenv.config();
const app = express();

const multer = require('multer');

const upload = multer({
    dest:'images',
    limits:{
        fileSize:1000000
    }
})

app.post('/upload',upload.single('upload'),(req,res)=>{
res.send('uploaded');
})

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const port = process.env.PORT || 3000;

require('./routes')(app);

app.listen(port,()=>{
    console.log('app running on port .',port)
})
