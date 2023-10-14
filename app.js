const express = require('express');
const path = require('path');
const dotenv = require('dotenv');
const db = require('./db');
const viewsRouter = require('./views/views.router');

dotenv.config();
const app = express();

const port = process.env.PORT || 5000;

db.connect();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.set('view engine', 'ejs');
app.use('/', viewsRouter);

// app.use('/api/v1/auth/', authRouter);
// app.use('/api/v1/tasks', taskRouter);

app.listen(port, () => {
  console.log('server started on port', port);
});
