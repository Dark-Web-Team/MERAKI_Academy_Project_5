const db = require("../../db/db");

const addRole = (req, res) => {
  const { role } = req.body;
  const query = `INSERT INTO roles  (role) VALUES (?);`;
  const data = [role];
  db.query(query, data, (err, result) => {
    if (err) {
      res.send(err);
      return;
    }
    res.status(201).json(result);
  });
};

module.exports = {
  addRole,
};
