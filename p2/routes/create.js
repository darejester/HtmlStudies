app.get('/create', requireLogin, (req, res) => {
    // display create contact form
    // post to /create
  });
  
  app.post('/create', requireLogin, (req, res) => {
    // create contact logic
    // redirect to / if successful
    // display create contact form with an error message if unsuccessful
  });