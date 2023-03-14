require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const Database = require('./wrapper.js');
const pug = require('pug');

// initialize database
const db = new Database();
db.initialize();
//express instance
const app = express();
//port number
const port = 3000;


//enaable body parser
app.use(express.urlencoded({ extended: true }));
//tell express where pug templates are
app.set('view engine', 'pug');


// middleware
app.use((req, res, next) => {
    req.db = db;
    next(); // ensures the route handlers will be called.
})

app.use('/', require('./routes/index'));

// start server
app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
