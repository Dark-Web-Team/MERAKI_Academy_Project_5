const db = require("../../db/db");

const addRating = (req, res) => {
  const business_id = JSON.parse(req.params.business_id);
  const { rate } = req.body;
  const { user_id } = req.token;
  const queryBuss = `SELECT * FROM businesses where business_id=?  ;`;
  const dataBuss = [business_id];
  db.query(queryBuss, dataBuss, (err, result) => {
    if (err) {
      res.send(err);
      return;
    }
    let newRate =
      (result[0].average_rating * result[0].number_rating + rate) /
      (result[0].number_rating + 1);
    let nerNumber = result[0].number_rating + 1;

    const queryUpdate =
      "UPDATE businesses SET average_rating=?, number_rating=? where business_id=?";
    const dataUpdate = [newRate, nerNumber, business_id];
    db.query(queryUpdate, dataUpdate, (err, response) => {
      if (err) {
        res.send(err);
        return;
      }
      const query = `INSERT INTO rating  (rate,user_id,business_id) VALUES (?,?,?);`;
      const data = [rate, user_id, business_id];
      db.query(query, data, (err, result2) => {
        if (err) {
          res.send(err);
          return;
        }
        const queryShow = `SELECT * FROM businesses where business_id=?;`;
        const dataShow = [business_id];
        db.query(queryShow, dataShow, (err, responseShow) => {
          if (err) {
            res.send(err);
            return;
          }
          res.status(201).json(responseShow);
        });
      });
    });
  });
};

const getUserRating = (req, res) => {
  const business_id = JSON.parse(req.params.business_id);
  const { user_id } = req.token;
  const query = `SELECT * FROM rating where user_id=? AND business_id=? `;
  const data = [user_id, business_id];
  db.query(query, data, (err, result) => {
    if (err) {
      res.send(err);
      return;
    }
    if (result.length) {
      res.status(200).json(result);
    } else {
      res.status(404).json("not found");
    }
  });
};

module.exports = {
  addRating,
  getUserRating,
};
