const dotenv = require('dotenv');
const db = require('./db');
const app = require('./api');

dotenv.config();

const port = process.env.PORT || 5000;

db.connect();

app.listen(port, () => {
  console.log('server started on port', port);
});
