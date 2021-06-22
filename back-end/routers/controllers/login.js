const db = require("../../db/db");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');




const login = (req, res) => {
    const { email, password } = req.body;
    const SECRET = process.env.SECRET
    const query = `SELECT * FROM users INNER JOIN roles ON users.role_id = roles.role_id  WHERE email=? `
    const data = [email]
    let hashedPassword
    db.query(query,data,async(err,result)=>{
      if (err){
          res.send(err)
      }
    if (!result.length){
        res.status(404).json("email not exists")
        return
    }
  
      const ver  =await  bcrypt.compare(password, result[0].password)
      if (!ver){
          res.status(403).json("wrong password")
          return
      }
      const payload = {
          user_id: result[0].user_id,
          role: result[0].role
        };
        const  options =  { expiresIn: '60h' }
        const token = jwt.sign(payload, SECRET, options);
        res.status(200).json({token});
        return
  });

  
};


module.exports = {
    login,
  };