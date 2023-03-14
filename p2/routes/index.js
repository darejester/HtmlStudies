const express = require('express')
const router = express.Router();

router.get('/', (req, res) => {
    // display all contacts in a table
    // each row should be clickable to go to /:id
    // main page should have a link to login/logout and /create page to create new contact
    res.render('index');
  });


  // // router.get('/', async (req, res) => {
  // //   // Check if user is logged in
  // //   const isLoggedIn = req.session && req.session.user;
  
  // //   // Get all contacts from the database
  // //   const db = new ContactDB();
  // //   await db.initialize();
  // //   const contacts = await db.db.read('Contact');
  
  // //   // Render the contacts page with the contacts and login/logout and create links
  // //   res.render('contacts', { contacts, isLoggedIn });
  // // });

  module.exports = router;