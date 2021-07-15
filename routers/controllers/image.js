const db = require("../../db/db");

const addImage = (req, res) => {
  const business_id = req.params.id;
  const { image } = req.body;
  const query = `INSERT INTO image  (image,business_id) VALUES (?,?);`;
  const data = [image, business_id];
  db.query(query, data, (err, result) => {
    if (err) throw err;
    res.status(201).json(result);
  });
};

const getImageByBusinessId = (req, res) => {
  const business_id = req.params.id;
  const query = `SELECT * FROM image WHERE business_id=? `;
  const data = [business_id];
  db.query(query, data, (err, result) => {
    if (err) {
      res.send(err);
    }
    res.status(200).json(result);
  });
};

module.exports = {
  addImage,
  getImageByBusinessId,
};
