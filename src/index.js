const express = require('express');
require('./db/mongoose');   // connection to database
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const port = process.env.PORT || 3000;

require('./routes')(app);

app.listen(port,()=>{
    console.log('app running on port .',port)
})
