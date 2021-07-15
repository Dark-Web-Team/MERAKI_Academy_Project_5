const db = require("../../db/db");

const addChat = (req, res) => {
  const business_id = JSON.parse(req.params.business_id);
  const { user_id } = req.token;
  const { chat_content, user_name } = req.body;
  const date = Date().slice(0, 24).split(2021).reverse().join(" ");
  const query = `INSERT INTO chat (chat_content,user_id, business_id,user_name,date) VALUES (?,?,?,?,?);`;
  const data = [chat_content, user_id, business_id, user_name, date];
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

const getAllChat = (req, res) => {
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
const addPrivateChat = (req, res) => {
  let roomId;
  const { user_id } = req.token;
  const { user2_id, user1_name, user2_name } = req.body;
  if (user_id > user2_id) {
    roomId = Number(`${user_id}1500${user2_id}`);
  } else {
    roomId = Number(`${user2_id}1500${user_id}`);
  }
  const query = `INSERT INTO privateChat (user1_id,user2_id,roomId,user1_name ,user2_name) VALUES (?,?,?,?,?);`;
  const data = [user2_id, user_id, roomId, user1_name, user2_name];
  db.query(query, data, (err, result) => {
    if (err) {
      res.send(err);
      return;
    }
    newId = result.insertId;
    const query_2 = `SELECT * FROM privateChat WHERE id=?;`;
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

const getPrivateChat = (req, res) => {
  const { user_id } = req.token;
  const query = `SELECT * FROM privateChat WHERE user1_id=? OR user2_id=? ;`;
  const data = [user_id, user_id];
  db.query(query, data, (err, result) => {
    if (err) {
      res.send(err);
      return;
    }
    res.status(200).json(result);
  });
};

const addChat2 = (req, res) => {
  const { roomId } = req.params;
  const { user_id } = req.token;
  const { chat_content, user_name } = req.body;
  const date = Date().slice(0, 24).split(2021).reverse().join(" ");
  const query = `INSERT INTO chat2 (chat_content,user_name, user_id,roomId,date) VALUES (?,?,?,?,?);`;
  const data = [chat_content, user_name, user_id, roomId, date];
  db.query(query, data, (err, result) => {
    if (err) {
      res.send(err);
      return;
    }
    newId = result.insertId;
    const query_2 = `SELECT * FROM chat2 WHERE chat_id=?;`;
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

const getAllChat2 = (req, res) => {
  const { roomId } = req.params;
  const query = `SELECT * FROM chat2 WHERE roomId=?;`;
  const data = [roomId];
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
  addPrivateChat,
  getPrivateChat,
  addChat2,
  getAllChat2,
};
