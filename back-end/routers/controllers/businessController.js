const connection = require("../../db/db");
const businessRouter = require("../routes/businessRouter");

const addBusiness = (req, res) => {
  const {
    type,
    displayName,
    city,
    owner_id,
    booking_price,
    main_img,
    description,
    opening_time,
    closing_time,
    lat,
    lng
  } = req.body;
  const query =
    "INSERT INTO businesses (type, displayName, city, owner_id, booking_price,average_rating,number_rating,main_img,description, opening_time, closing_time, lat, lng) VALUES (?,?,?,?,?,0,0,?,?,?,?,?,?)";
  const businessData = [
    type,
    displayName,
    city,
    owner_id,
    booking_price,
    main_img,
    description,
    opening_time,
    closing_time,
    lat,
    lng
  ];

  connection.query(query, businessData, (err, result) => {
    if (err) {
      console.log(err);
      return res.send(err);
    }
    res.status(201).json({
      conformation : "created successfully" ,
      id : result.insertId
    });
  });
};

const updateBusiness = (req, res) => {
  const {
    displayName,
    city,
    booking_price,
    average_rating,
    number_rating,
    main_img,
    description,
    opening_time,
    closing_time,
  } = req.body;
  const business_id = JSON.parse(req.params.business_id);
  const query =
    "UPDATE businesses SET displayName=?, city=?, booking_price=?, average_rating=?, number_rating=?, main_img=?,description=?,opening_time=?,closing_time=? WHERE business_id=?";
  const updateData = [
    displayName,
    city,
    booking_price,
    average_rating,
    number_rating,
    business_id,
    main_img,
    description,
    opening_time,
    closing_time,
  ];

  connection.query(query, updateData, (err, result) => {
    if (err) {
      console.log(err);
      return res.send(err);
    }
    const query_2 =
      "SELECT * FROM businesses LEFT JOIN users ON businesses.owner_id = users.user_id WHERE owner_id =?";
    const owner_id = [req.token.user_id];
    console.log(req.token.user_id);
    connection.query(query_2, owner_id, (err, result) => {
      if (err) {
        console.log(err);
        return res.send(err);
      }

      res.status(200).json(result);
    });
  });
};

const deleteBusiness = (req, res) => {
  const business_id = req.params.business_id;
  const query = "UPDATE businesses SET is_deleted = 1 WHERE business_id=?";
  const deleteData = [business_id];
  connection.query(query, deleteData, (err, result) => {
    if (err) {
      console.log(err);
      return res.send(err);
    }
    res.status(200).json("deleted successfully");
  });
};

const getBusinessByType = (req, res) => {
  const {type, page} = req.params;
  const query = "SELECT * FROM businesses WHERE type=? LIMIT 8 OFFSET ?";
  const businessType = [type,((page-1)*8)];

  
  connection.query(query, businessType, (err, result) => {
    if (err) {
      console.log(err);
      return res.send(err);
    }
    res.status(200).json(result);
  });
};

const getBusinessById = (req, res) => {
  const business_id = req.params.id;
  const query = "SELECT * FROM businesses WHERE business_id = ?";
  const id = [business_id];

  connection.query(query, id, (err, result) => {
    if (err) {
      console.log(err);
      return res.send(err);
    }
    res.status(200).json(result);
  });
};

const getBusinessByUserId = (req, res) => {
  const owner_id = req.token.user_id;
  const query = "SELECT * FROM businesses WHERE owner_id = ?";
  const id = [owner_id];

  connection.query(query, id, (err, result) => {
    if (err) {
      console.log(err);
      return res.send(err);
    }
    res.status(200).json(result);
  });
};

const getBusinessByTypeByPrice = (req, res) => {
  const { type, lowPrice, highPrice,page } = req.params;
  const query =
    "SELECT * FROM businesses WHERE type=? AND booking_price BETWEEN ? AND ? LIMIT 8 OFFSET ?";
  const parameters = [type, lowPrice, highPrice,(page-1)*8];

  connection.query(query, parameters, (err, result) => {
    if (err) {
      console.log(err);
      return res.send(err);
    }
    res.status(200).json(result);
  });
};

const getBusinessByTypeByPriceByCity = (req, res) => {
  const { type, lowPrice, highPrice, city,page } = req.params;
  const query =
    "SELECT * FROM businesses WHERE type=? AND city=? AND booking_price BETWEEN ? AND ? LIMIT 8 OFFSET ?";
  const parameters = [type, city, lowPrice, highPrice,(page-1)*8];

  connection.query(query, parameters, (err, result) => {
    if (err) {
      console.log(err);
      return res.send(err);
    }
    res.status(200).json(result);
  });
};

const getBusinessByCity = (req, res) => {
  const { type, city, page } = req.params;
  const query =
    "SELECT * FROM businesses WHERE type=? AND city=? LIMIT 8 OFFSET ?";
  const parameters = [type, city,(page-1)*8];

  connection.query(query, parameters, (err, result) => {
    if (err) {
      console.log(err);
      return res.send(err);
    }
    res.status(200).json(result);
  });
};

const searchBusinessByName = (req,res)=>{
  const {name} = req.params;
  const query = 'SELECT * FROM businesses WHERE displayName LIKE ?'
  const nameSearched = [`%${name}%`]

  connection.query(query,nameSearched,(err,result)=>{
    if (err) {
      console.log(err);
      return res.send(err);
    }
    res.status(200).json(result);
  })
}


module.exports = {
  addBusiness,
  updateBusiness,
  deleteBusiness,
  getBusinessByType,
  getBusinessById,
  getBusinessByTypeByPrice,
  getBusinessByTypeByPriceByCity,
  getBusinessByCity,
  searchBusinessByName,
  getBusinessByUserId,
};
