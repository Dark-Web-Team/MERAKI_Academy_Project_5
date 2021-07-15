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
  const query = `SELECT * FROM comments INNER JOIN users ON comments.commenter = users.user_id WHERE business_id = ? AND comments.is_deleted = 0;`;
  const id = [business_id];

  db.query(query, id, (err, result) => {
    if (err) {
      return res.send(err);
    }
    res.status(200).json(result);
  });
};

const deleteComment = (req, res) => {
  const comment_id = req.params.comment_id;
  const query = `UPDATE comments 
  SET  is_deleted = 1
   WHERE comment_id = ?`;
  const arr = [comment_id];
  db.query(query, arr, (err, result) => {
    if (err) {
      res.send(err);
      return;
    }
    res.status(200).json(result);
  });
};

module.exports = {
  addComment,
  getComments,
  deleteComment,
};
