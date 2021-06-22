const db = require("./../../db/db");
const bcrypt = require('bcrypt');


const createNewUser = async (req, res) => {
  const { displayName, email, password, city, role} = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const query = `INSERT INTO users ( displayName, email, passwrod, city, role) VALUES (?, ?, ?, ?, ?)`;
  const data = [displayName, email, hashedPassword, city, role];
  db.query(query, data, (err, result) => {
    if (err) throw err;
    console.log("RESULT: ", result);
    res.json(result);
  });
};

module.exports = {
  createNewUser,
};


