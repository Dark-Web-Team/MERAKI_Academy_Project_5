const db = require('./db');

const findAll = (req,res) => {
  // const query = `SELECT * FROM users WHERE name = "John"`;
  const query = `SELECT * FROM users`;
  db.query(query, (err, result) => {
    if (err) throw err;
    console.log('RESULT: ', result);
    res.json(result)
  });
};


const findEmail = (req,res) => {
  // const query = `SELECT * FROM users WHERE name = "John"`;
  const query = `SELECT email FROM users`;
  db.query(query, (err, result) => {
    if (err) throw err;
    console.log('RESULT: ', result);
    res.json(result)
  });
};

const findJohn = (userName) => {
  // const query = `SELECT * FROM users WHERE name = "John"`;
  const query = `SELECT * FROM users WHERE name = ?`;
  const arr = [userName];

  // SELECT * FROM users WHERE name = "abd"
  db.query(query, arr, (err, result) => {
    if (err) throw err;
    console.log('RESULT: ', result);
    
  });
};

// findJohn();
// findJohn('soiso');

module.exports = {
  findAll,
  findEmail
};
