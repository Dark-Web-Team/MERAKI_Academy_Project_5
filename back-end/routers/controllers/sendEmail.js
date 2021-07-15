const nodemailer = require("nodemailer");
var cron = require("node-cron");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD,
  },
});

const Transporter = (req, res) => {
  const { time, date } = req.body;
  let month = parseInt(date.slice(5, 7));
  let day = parseInt(date.slice(8, 10));
  if (day - 1 === 0) {
    month = month - 1;
    day = 30;
  } else {
    day = day - 1;
  }

  const to = req.token.email;

  const mailOptions = {
    from: "bookingwebsitee@gmail.com",
    to: to,
    subject: "New message from booking website",
    text: `Hello ,
    
    your booking request is accepted and is set on ${date} at ${time}

    please be there 10 minutes before reservation time 
    
    Best wishes,

    BookingWebsite team`,
  };

  const mailOptionsRemind = {
    from: "bookingwebsitee@gmail.com",
    to: to,
    subject: "Reservation Reminder",
    text: `Hello ,
    
    We want to remind you about  your booking  on ${date} at ${time}

    please be there 10 minutes before reservation time 
    
    Best wishes,

    BookingWebsite team`,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      res.json("email sent successfully");
      //   console.log("Email sent: " + info.response);
    }
  });

  cron.schedule(`* * ${day} ${month} * `, () => {
    transporter.sendMail(mailOptionsRemind, function (error, info) {
      if (error) {
        console.log(error);
      }
    });
  });
};

module.exports = {
  Transporter,
};
