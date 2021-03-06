const express = require("express");
const app = express();
require("dotenv").config();
const cors = require("cors");
const socket = require("socket.io");
const db = require("./db/db");
const path = require('path');



app.use(express.json());

app.use(cors());
app.use(express.static(path.resolve(__dirname, './client/build')));
/* ==================== */
const roleRouter = require("./routers/routes/roleRouter");
const usersRouter = require("./routers/routes/usersRouter");
const loginRouter = require("./routers/routes/loginRouter");
const businessRouter = require("./routers/routes/businessRouter");
const imageRouter = require("./routers/routes/imageRouter");
const commentsRouter = require("./routers/routes/commentsRouter");
const ratingRouter = require("./routers/routes/ratingRouter");
const creditCardsRouter = require("./routers/routes/creditCardsRouter");
const reservationsRouter = require("./routers/routes/reservationsRouter");
const sendEmailRouter = require("./routers/routes/sendEmailRouter");
const chatRouter = require("./routers/routes/chatRouter");
const paymentRouter = require('./routers/routes/paymentRouter');




app.use("/role",roleRouter);
app.use("/users",usersRouter);
app.use("/login",loginRouter);
app.use("/business",businessRouter);
app.use("/image",imageRouter);
app.use("/comments",commentsRouter);
app.use("/rating",ratingRouter);
app.use("/creditCards",creditCardsRouter);
app.use("/reservations",reservationsRouter);
app.use("/sendEmail",sendEmailRouter);
app.use('/create-payment-intent',paymentRouter);
app.use("/chat", chatRouter);

const PORT =  process.env.PORT || 5000;

const server = app.listen(PORT, () => {
  console.log(`Server On ${PORT}`);
});

const io = socket(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "DELETE", "PUT"],
  },
});

io.on("connection", (socket) => {
  socket.on("join_room", (data) => {
    socket.join(data);
    
  });

  socket.on("send_message", (data) => {
    socket.to(data.roomId).emit("receive_message", data.content);
  });
  socket.on("join_userList", (data) => {
    socket.join(data);
    
  });

  socket.on("send_message_req", (data) => {
    socket.to(data.roomId).emit("receive_message_req", data.content);
    console.log("data.content",data.content);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});
