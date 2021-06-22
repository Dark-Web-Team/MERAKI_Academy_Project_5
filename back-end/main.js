const express = require('express');
const app = express();
require('dotenv').config();

const db = require('./db');

const users = require('./users');
/* ==================== */

// console.log('HHHHHHHHHHHHHHHHHHHHHHHHHH:',users);
// users.findAll();

app.get('/users', users.findAll);
app.get('/users/email', users.findEmail);

/* ==================== */

const PORT = 3000;
app.listen(PORT, () => {
  console.log('SERVER IS WORKING ON http://localhost:' + PORT);
});
