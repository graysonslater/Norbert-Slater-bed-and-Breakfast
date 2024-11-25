// IMPORTS AND REQUIREMENTS

//imports the Express.js framework, which is used to create web applications and APIs in Node.js
const express = require('express');
//creates router object capable of performing middleware and routing functions
const router = express.Router();
//import api folder
const apiRouter = require('./api');
//activates APi route
router.use('/api', apiRouter);

// Serve React build files in production - allows the backend to serve the React frontend in production, enabling proper routing for single-page applications and providing CSRF protection.
if (process.env.NODE_ENV === 'production') {
  const path = require('path');
  router.get('/', (req, res) => {// Serve the frontend's index.html file at the root route
    res.cookie('XSRF-TOKEN', req.csrfToken());
    return res.sendFile(
      path.resolve(__dirname, '../../frontend', 'dist', 'index.html')
    );
  });
  
  router.use(express.static(path.resolve("../frontend/dist")));// Serve the static assets in the frontend's build folder

  router.get(/^(?!\/?api).*/, (req, res) => { // Serve the frontend's index.html file at all other routes NOT starting with /api
    res.cookie('XSRF-TOKEN', req.csrfToken());
    return res.sendFile(
      path.resolve(__dirname, '../../frontend', 'dist', 'index.html')
    );
  });
}

// Add a XSRF-TOKEN cookie in development - provides a way for the frontend application to easily obtain a fresh CSRF token during development.
if (process.env.NODE_ENV !== 'production') {
  router.get('/api/csrf/restore', (req, res) => {
    res.cookie('XSRF-TOKEN', req.csrfToken());
    return res.json({});
  });
}

//test route
router.get('/hello/world', function(req, res) {
  res.cookie('XSRF-TOKEN', req.csrfToken());
  res.send('Hello World!');
});

// Add a XSRF-TOKEN cookie
router.get("/api/csrf/restore", (req, res) => {
  const csrfToken = req.csrfToken();
  res.cookie("XSRF-TOKEN", csrfToken);
  res.status(200).json({
    'XSRF-Token': csrfToken
  });
});

module.exports = router;