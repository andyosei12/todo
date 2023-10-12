const express = require('express');
const dotenv = require('dotenv');
const db = require('./db');
const authRouter = require('./routes/auth');
const taskRouter = require('./routes/task');
const verifyUser = require('./middleware/auth/verifyUser');

dotenv.config();
const app = express();

const port = process.env.PORT || 5000;

db.connect();
app.use(express.json());

app.use('/api/v1/auth/', authRouter);
app.use('/api/v1/tasks', verifyUser, taskRouter);

app.listen(port, () => {
  console.log('server started on port', port);
});
