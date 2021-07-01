const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "bookingwebsitee@gmail.com",
    pass: "B0790322539",
  },
});

const Transporter = (req, res) => {
  const { to } = req.body;
  const mailOptions = {
    from: "bookingwebsitee@gmail.com",
    to: to,
    subject: "New message from booking website",
    text: `Hello ,

    You got a new message from booking website
    
    your booking request is accepted in the time you choose it
    
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
