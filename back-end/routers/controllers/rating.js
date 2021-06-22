const db = require ("../../db/db")

const addRating = (req ,res) =>{
    const business_id= JSON.parse( req.params.business_id)
    const {rate}=req.body;
    const { user_id } = req.token;

    const query = `INSERT INTO rating  (rate,user_id,business_id) VALUES (?,?,?);`;
 const data =[rate,user_id,business_id];
 db.query(query,data,(err,result)=>{
     if(err)throw err ;
     res.status(201).json(result);
 })

}

module.exports = {
	addRating,
};
