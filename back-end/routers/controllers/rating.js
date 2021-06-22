const { response } = require("express");
const db = require("../../db/db");

const addRating = (req, res) => {
  const business_id = JSON.parse(req.params.business_id);
  const { rate } = req.body;
  const { user_id } = req.token;
  const queryBuss = `SELECT * FROM businesses where business_id=?  ;`
  const dataBuss =[business_id]
 db.query(queryBuss,dataBuss,(err,result)=>{
    if (err) throw err;
    let newRate = (result[0].average_rating*result[0].number_rating+rate)/(result[0].number_rating+1)
    let nerNumber = result[0].number_rating+1

    const queryUpdate = 'UPDATE businesses SET average_rating=?, number_rating=? where business_id=?';
    const dataUpdate = [newRate,nerNumber,business_id]
    db.query(queryUpdate,dataUpdate,(err,response)=>{
        if (err) throw err;
        const query = `INSERT INTO rating  (rate,user_id,business_id) VALUES (?,?,?);`;
 const data = [rate, user_id, business_id];
   db.query(query, data, (err, result2) => {
    if (err) throw err;
    const queryShow = `SELECT * FROM businesses where business_id=?  ;`
    const dataShow =[business_id]
    db.query(queryShow,dataShow,(err,responseShow)=>{
        if (err) throw err;
        res.status(201).json(responseShow)
    })
  });
    })
 })
 
};

module.exports = {
  addRating,
};
