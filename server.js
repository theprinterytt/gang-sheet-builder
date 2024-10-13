// Import the Express module
const express = require('express');

// Create an instance of the Express app
const app = express();

// Define a route for the home page ('/') that returns "Hello World!"
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Define the port for the server (use port 3000 by default)
const PORT = process.env.PORT || 3000;

// Start the server and listen on the defined port
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
