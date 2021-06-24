const db = require("../../db/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken") ;

const createUser = async (req, res) => {
  let { displayName, city, email, password, age, gender, role_id } = req.body;
  let newId
  const hashedPassword = await bcrypt.hash(password, 10);
  password = hashedPassword;
  const query = `INSERT INTO users  (displayName, city, email, password, age, gender, role_id) VALUES (?,?,?,?,?,?,?);`
  const arr = [displayName, city, email, password, age, gender, role_id];
  db.query(query,arr,(err,result)=>{
    if (err) {
      res.status(403).json(err)
      return
    }
	  newId = result.insertId
    const query_2 = `SELECT * FROM users WHERE user_id=?;`
    const data=[newId]
    db.query(query_2,data,(err,response)=>{
      if (err) {
        res.send(err);
        return
      }
      res.status(201).json(response)
    })
	
  });
}

const getUser =  (req, res) => {
  const { user_id } = req.token;
  const query = `SELECT * FROM users WHERE user_id=?;`
  const data = [user_id];
  db.query(query,data,(err,result)=>{
	  if (err) {
      res.send(err);
      return
    }
    console.log('RESULT: ', result);
    res.json(result)
  });
}

const updateUser = async (req, res) => {
  const { user_id } = req.token;
  const { displayName, city, email, password, age, gender, role_id } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  const query = `UPDATE users 
  SET displayName = ?, city =  ? , email = ? ,password = ?, age =  ? , gender = ? , role_id = ? 
   WHERE user_id = ?`;
  const arr = [displayName, city, email, hashedPassword, age, gender, role_id ,user_id ];
  db.query(query,arr,(err,result)=>{
    if (err) {
      res.send(err);
      return
    }
    const query_2 = `SELECT * FROM users WHERE user_id=?;`
    const data=[user_id]
    db.query(query_2,data,(err,response)=>{
      if (err) {
        res.send(err);
        return
      }
      res.status(201).json(response)
    })
	
  });
   };

module.exports = {
    createUser,
    getUser,
    updateUser
};

