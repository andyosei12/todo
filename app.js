const express = require('express');
const dotenv = require('dotenv');

dotenv.config();
const app = express();

const port = process.env.PORT || 5000;

app.get('/tasks', (req, res) => {
  res.json({
    message: 'Get all tasks',
  });
});

app.listen(port, () => {
  console.log('server started on port', port);
});
