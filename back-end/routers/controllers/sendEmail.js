const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "bookingwebsitee@gmail.com",
    pass: "B0790322539",
  },
});

const Transporter = (req, res) => {
  const { time , date} = req.body;
  const to = req.token.email
  
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
  
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      res.json('email sent successfully');
    //   console.log("Email sent: " + info.response);
    }
  });
};

module.exports = {
  Transporter,
};
