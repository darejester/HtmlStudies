require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const Database = require('./db');

// initialize database
const db = new Database();

const app = express();
const port = 3000;

// middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());



// login middleware
const requireLogin = (req, res, next) => {
  if (!req.session.user) {
    res.redirect('/login');
  } else {
    next();
  }
};

// routes
app.get('/', (req, res) => {
  // display all contacts in a table
  // each row should be clickable to go to /:id
  // main page should have a link to login/logout and /create page to create new contact
});

app.get('/login', (req, res) => {
  // display login form
  // post to /login
  // have a link to the /signup page
});

app.post('/login', (req, res) => {
  // login logic
  // redirect to / if successful
  // display login page with an error message if unsuccessful
});

app.get('/signup', (req, res) => {
  // display signup form
  // post to /signup
});

app.post('/signup', (req, res) => {
  // signup logic
  // redirect to /login if successful
  // display signup page with an error message if unsuccessful
});

app.get('/create', requireLogin, (req, res) => {
  // display create contact form
  // post to /create
});

app.post('/create', requireLogin, (req, res) => {
  // create contact logic
  // redirect to / if successful
  // display create contact form with an error message if unsuccessful
});

app.get('/:id', requireLogin, (req, res) => {
  // display contact with id = :id
  // have links to /:id/edit and /:id/delete
  // have a link back to /
});

app.get('/:id/edit', requireLogin, (req, res) => {
  // display edit form for contact with id = :id
  // post to /:id/edit
});

app.post('/:id/edit', requireLogin, (req, res) => {
  // edit contact logic
  // redirect to /:id if successful
  // display edit form with an error message if unsuccessful
});

app.get('/:id/delete', requireLogin, (req, res) => {
  // display confirmation page for deletion
  // have a form (no user input) that posts back to /:id/delete
});

app.post('/:id/delete', requireLogin, (req, res) => {
  // delete contact logic
  // redirect back to /
});

// start server
app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
