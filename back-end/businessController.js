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

const deleteBusiness = (req,res)=>{
    const business_id = req.params.business_id;
    const query = 'UPDATE businesses SET is_deleted = 1 WHERE business_id=?';
    const deleteData= [business_id];
    connection.query(query,deleteData,(err,result)=>{
        if (err) {
            console.log(err)
            res.json(err)
        }
        res.status(201).json("deleted successfully")
    })
}

module.exports = {addBusiness,updateBusiness,deleteBusiness};