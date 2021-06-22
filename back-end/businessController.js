const connection = require('./db/db');

const addBusiness = (req,res)=>{
    const {type, displayName, city, owner_id, booking_price} = req.body;
    const query = 'INSERT INTO businesses (type, displayName, city, owner_id, booking_price) VALUES (?,?,?,?,?)'
    const businessData = [type, displayName, city, owner_id, booking_price]

    connection.query(query,businessData,(err,result)=>{
        if (err) {
            console.log(err)
            res.json(err)
        }
        res.status(201).json("created successfully")
    })
}

module.exports = {addBusiness}