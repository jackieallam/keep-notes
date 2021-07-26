require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const router = require('./routes');
const path = require('path');

const app = express();

const PORT = process.env.PORT || 3001;
const DB_URI   = "mongodb://localhost:27017/notesDB"

// Middleware
app.use(express.urlencoded({ extended: true })); 
app.use(express.json());
app.use('/', router); 

// Establish DB connection
mongoose.connect(process.env.MONGODB_URI || DB_URI, { 
    useNewUrlParser: true, 
    useFindAndModify: false, 
    useUnifiedTopology: true 
}); 

// Event Listeners
mongoose.connection.once('open', function() { 
  console.log(`Connected to database.`);
  });
  mongoose.connection.on('error', function(error) {
    console.log('Mongoose Connection Error : ' + error);
  });

if (process.env.NODE_ENV === 'production') {           
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

app.listen(PORT, function() { console.log(`Server listening on port ${PORT}`) });