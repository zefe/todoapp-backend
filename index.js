const express = require('express');
const cors = require('cors');
const {config} = require('./config');
const corsConfing = require('./config/cors');

// Create conexion to data base
const db = require('./config/db');

// Import model
require('./models/Todos');

db.sync()
    .then(() => console.log('Connection to db has been established successfully.'))
    .catch((error) => console.log('Unable to connect to the database:', error) )

 // Create express app
 const app = express();

 // Cors
 app.use(cors(corsConfing));

 
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true }))

// Routing
const router = require('./routes');
app.use('/', router() );

//  Server
app.listen(config.port, function(){
    console.log(`Server running on http://localhost:${config.port}`);
});
