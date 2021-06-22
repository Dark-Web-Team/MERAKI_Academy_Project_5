const connection = require('./db/db');
const businessRouter = require('./routers/routes/businessRouter');

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

const updateBusiness = (req,res)=>{
    const {displayName, city, booking_price, average_rating, number_rating} = req.body;
    const business_id= JSON.parse( req.params.business_id)
    const query = 'UPDATE businesses SET displayName=?, city=?, booking_price=?, average_rating=?, number_rating=? WHERE business_id=?';
    const updateData = [displayName, city, booking_price, average_rating, number_rating,business_id]
    console.log(updateData);

    connection.query(query,updateData,(err,result)=>{
        if (err) {
            console.log(err)
            res.json(err)
        }
        res.status(201).json("updated successfully")
    })
}

module.exports = {addBusiness,updateBusiness}