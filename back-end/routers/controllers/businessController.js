const connection = require('../../db/db');
const businessRouter = require('../routes/businessRouter');

const addBusiness = (req,res)=>{
    const {type, displayName, city, owner_id, booking_price,main_img,description,opening_time,closing_time} = req.body;
    const query = 'INSERT INTO businesses (type, displayName, city, owner_id, booking_price,average_rating,number_rating,main_img,description, opening_time, closing_time) VALUES (?,?,?,?,?,0,0,?,?,?,?)'
    const businessData = [type, displayName, city, owner_id, booking_price,main_img,description,opening_time,closing_time]

    connection.query(query,businessData,(err,result)=>{
        if (err) {
            console.log(err)
            return res.send(err)
        }
        res.status(201).json("created successfully")
    })
}

const updateBusiness = (req,res)=>{
    const {displayName, city, booking_price, average_rating, number_rating,main_img,description,opening_time,closing_time} = req.body;
    const business_id= JSON.parse( req.params.business_id)
    const query = 'UPDATE businesses SET displayName=?, city=?, booking_price=?, average_rating=?, number_rating=?, main_img=?,description=?,opening_time=?,closing_time=? WHERE business_id=?';
    const updateData = [displayName, city, booking_price, average_rating, number_rating,business_id,main_img,description,opening_time,closing_time]
    console.log(updateData);

    connection.query(query,updateData,(err,result)=>{
        if (err) {
            console.log(err)
            return res.send(err)
        }
        res.status(200).json("updated successfully")
    })
}

const deleteBusiness = (req,res)=>{
    const business_id = req.params.business_id;
    const query = 'UPDATE businesses SET is_deleted = 1 WHERE business_id=?';
    const deleteData= [business_id];
    connection.query(query,deleteData,(err,result)=>{
        if (err) {
            console.log(err)
            return res.send(err)
        }
        res.status(200).json("deleted successfully")
    })
}

const getBusinessByType = (req,res)=>{
    const type = req.params.type;
    const query = 'SELECT * FROM businesses WHERE type=?';
    const businessType = [type]

    connection.query(query,businessType,(err,result)=>{
        if (err) {
            console.log(err)
            return res.send(err)
        }
        res.status(200).json(result)
    })
}

const getBusinessById = (req,res)=>{
    const business_id = req.params.id;
    const query = 'SELECT * FROM businesses WHERE business_id = ?';
    const id = [business_id]

    connection.query(query,id,(err,result)=>{
        if (err) {
            console.log(err)
            return res.send(err)
        }
        res.status(200).json(result)
    })
}

const getBusinessByTypeByPrice = (req,res)=>{
    const {type,lowPrice,highPrice}=req.params;
    const query = 'SELECT * FROM businesses WHERE type=? AND booking_price BETWEEN ? AND ?'
    const paramaters=[type,lowPrice,highPrice];

    connection.query(query,paramaters,(err,result)=>{
        if (err) {
            console.log(err)
            return res.send(err)
        }
        res.status(200).json(result)
    })
}


module.exports = {addBusiness,updateBusiness,deleteBusiness, getBusinessByType,getBusinessById,getBusinessByTypeByPrice};