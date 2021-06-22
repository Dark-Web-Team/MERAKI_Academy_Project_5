const db = require ("../../db/db")

const addImage = (req ,res) =>{
    const business_id=req.params.id;
    const {image}=req.body;
    const query = `INSERT INTO roles  (image,business_id) VALUES (?,?);`;
    const data =[image,business_id];
    db.query(query,data,(err,result)=>{
        if(err)throw err ;
        res.status(201).json(result);
    })
   
   }
   
   module.exports = {
    addImage,
   };
   