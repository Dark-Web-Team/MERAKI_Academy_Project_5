const db = require("../../db/db");

const addChat = (req, res) => {
  const business_id = JSON.parse(req.params.business_id);
  const { user_id } = req.token;
  const { chat_content,user_name } = req.body;
  const date = Date().slice(0,24).split(2021 ).reverse().join(" ")
  const query = `INSERT INTO chat (chat_content,user_id, business_id,user_name,date) VALUES (?,?,?,?,?);`;
  const data = [chat_content, user_id, business_id,user_name,date];
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

const getAllChat = (req,res) => {
  const business_id = JSON.parse(req.params.business_id);
  const query = `SELECT * FROM chat WHERE business_id=?;`;
  const data = [business_id];
  db.query(query, data, (err, result) => {
    if (err) {
      res.send(err);
      return;
    }
    res.status(200).json(result);
  });
};

module.exports = {
  addChat,
  getAllChat,
};
