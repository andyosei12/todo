const express = require('express');
const dotenv = require('dotenv');
const db = require('./db');
const authRouter = require('./routes/auth');

dotenv.config();
const app = express();

const port = process.env.PORT || 5000;

db.connect();
app.use(express.json());

app.use('/api/v1/auth/', authRouter);

app.listen(port, () => {
  console.log('server started on port', port);
});
