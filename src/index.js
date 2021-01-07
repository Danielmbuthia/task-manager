const express = require('express');
require('./db/mongoose');   // connection to database
const bodyParser = require("body-parser");
const dotenv = require('dotenv');
dotenv.config();
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const port = process.env.PORT;

require('./routes')(app);

app.listen(port,()=>{
    console.log('app running on port .',port)
})
