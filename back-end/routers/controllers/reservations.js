const db = require("../../db/db");


const addReservations = (req,res)=>{
    const reserved_business = JSON.parse(req.params.business_id);
    const reservation_maker = req.token.user_id
    const {reservation_date,reservation_time} =req.body;
    const query = `INSERT INTO reservations (reservation_date,reservation_time,reservation_maker,reserved_business) VALUES (?,?,?,?);`;
    const data = [reservation_date,reservation_time,reservation_maker,reserved_business]
    db.query(query,data,(err,result)=>{
        if (err) {
            res.send(err);
            return;
          }
          newId = result.insertId
    const query_2 = `SELECT * FROM reservations WHERE reservation_id=?;`
    const data=[newId]
    db.query(query_2,data,(err,response)=>{
      if (err) {
        res.send(err);
        return
      }
      res.status(201).json(response)
    })
    })


}








module.exports = {
    addReservations,
  };