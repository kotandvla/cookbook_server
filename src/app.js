require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')
const mongoose = require('mongoose');
const logger = new (require('./logger'))()
const autoIncrement = require('mongoose-auto-increment');
const uri = process.env.URI


const app = express()
app.use(morgan('combined'))
app.use(bodyParser.json())
app.use(cors())

try{
    
  mongoose.connect(uri, {
    useMongoClient: true
  });

  // Get Mongoose to use the global promise library
  mongoose.Promise = global.Promise;
  //Get the default connection
  var db = mongoose.connection;

  //Bind connection to error event (to get notification of connection errors)
  db.on('error', console.error.bind(console, 'MongoDB connection error:'));

    
  app.use(require('./routes'))
  
  var listener = app.listen(process.env.PORT || 8081, function () {
    logger.info('Your app is listening on port ' + listener.address().port);
  });
  
}
catch (e) {
  logger.log(e.message)
  throw e
}