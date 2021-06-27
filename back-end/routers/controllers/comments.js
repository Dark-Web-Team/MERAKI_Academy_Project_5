const db = require("../../db/db");

const addComment = (req, res) => {
  const business_id = JSON.parse(req.params.business_id);
  const { user_id } = req.token;
  const { comment } = req.body;
  const query = `INSERT INTO comments (comment,commenter,business_id) VALUES (?,?,?);`;
  const data = [comment, user_id, business_id];
  db.query(query, data, (err, result) => {
    if (err) {
      res.send(err);
      return;
    }
    newId = result.insertId;
    const query_2 = `SELECT * FROM comments WHERE comment_id=?;`;
    const data = [newId];
    db.query(query_2, data, (err, response) => {
      if (err) {
        res.send(err);
        return;
      }
      res.status(201).json(response);
    });
  });
};

const getComments = (req, res) => {
  const business_id = req.params.business_id;
  const query = `SELECT * FROM comments INNER JOIN users ON comments.commenter = users.user_id WHERE business_id = ?;`
  const id = [business_id];

  db.query(query, id, (err, result) => {
    if (err) {
      console.log(err);
      return res.send(err);
    }
    res.status(200).json(result);
  });
};

module.exports = {
  addComment,
  getComments,
};
