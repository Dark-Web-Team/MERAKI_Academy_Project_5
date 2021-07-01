const db = require("../../db/db");

const addReservations = (req, res) => {
  const reserved_business = JSON.parse(req.params.business_id);
  const reservation_maker = req.token.user_id;
  const { reservation_date, reservation_time } = req.body;
  const query = `INSERT INTO reservations (reservation_date,reservation_time,reservation_maker,reserved_business) VALUES (?,?,?,?);`;
  const data = [
    reservation_date,
    reservation_time,
    reservation_maker,
    reserved_business,
  ];
  db.query(query, data, (err, result) => {
    if (err) {
      res.send(err);
      return;
    }
    newId = result.insertId;
    const query_2 = `SELECT * FROM reservations WHERE reservation_id=?;`;
    const data = [newId];
    db.query(query_2, data, (err, response) => {
      if (err) {
        res.send(err);
        return;
      }
      res.status(201).json(response);
    });
  });
};

const getReservationsByDate = (req, res) => {
  const reserved_business = JSON.parse(req.params.business_id);
  const reservation_date = req.params.reservation_date;
  const query = `SELECT reservation_time FROM reservations WHERE reserved_business=? AND reservation_date=?;`;
  const data = [reserved_business, reservation_date];
  db.query(query, data, (err, result) => {
    if (err) {
      res.send(err);
      return;
    }
    res.status(200).json(result);
  });
};

const getUserReservation = (req, res) => {
  const reservation_maker = req.token.user_id;
  const query = `SELECT reservation_time,reservation_date,displayName,main_img,booking_price FROM reservations 
  INNER JOIN businesses ON businesses.business_id = reservations.reserved_business
   WHERE reservation_maker=?
   ORDER BY reservation_date DESC
   ;`;
  const data = [reservation_maker];
  db.query(query, data, (err, result) => {
    if (err) {
      res.send(err);
      return;
    }
    res.status(200).json(result);
  });
};

module.exports = {
  addReservations,
  getReservationsByDate,
  getUserReservation,
};
