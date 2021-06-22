const db = require("../../db/db");



const AddCreditCard = (req,res)=>{
const {user_id} = req.token
const {cardNumber,cardHolder,expiryDate} =req.body;
const query = `INSERT INTO creditCards  (cardNumber,cardHolder,expiryDate,user_id) VALUES (?,?,?,?);`
const data = [cardNumber,cardHolder,expiryDate,user_id]
db.query(query,data,(err,result)=>{
    if(err)throw err ;
    newId = result.insertId
    const query_2 = `SELECT * FROM creditCards WHERE card_id=?;`
    const data=[newId]
    db.query(query_2,data,(err,response)=>{
      if (err) {
        res.send(err);
      }
      res.status(201).json(response)
    })
})
};

module.exports = {
    AddCreditCard
}