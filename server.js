const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files from the current directory
app.use(express.static(path.join(__dirname)));

// Handle the root route and serve your index.html file
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html')); // Make sure index.html is in the root of your project
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
