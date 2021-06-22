const express = require('express');
const app = express();
require('dotenv').config();

const db = require('./db/db');

/* ==================== */


/* ==================== */

const PORT = 5000;
app.listen(PORT, () => {
  console.log('SERVER IS WORKING ON http://localhost:' + PORT);
});
