const db = require("../../db/db");

const addChat = (req, res) => {
  const business_id = JSON.parse(req.params.business_id);
  const { user_id } = req.token;
  const { chat_content } = req.body;
  const query = `INSERT INTO chat (chat_content,user_id, business_id) VALUES (?,?,?);`;
  const data = [chat_content, user_id, business_id];
  db.query(query, data, (err, result) => {
    if (err) {
      res.send(err);
      return;
    }
    newId = result.insertId;
    const query_2 = `SELECT * FROM chat WHERE chat_id=?;`;
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

const getAllChat = () => {
  const business_id = JSON.parse(req.params.business_id);
  const query = `SELECT * FROM chat WHERE business_id=?;`;
  const data = [business_id];
  db.query(query, data, (err, result) => {
    if (err) {
      res.send(err);
      return;
    }
    res.status(201).json(response);
  });
};

module.exports = {
  addChat,
  getAllChat,
};
