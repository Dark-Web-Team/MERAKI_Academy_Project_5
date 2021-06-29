const express = require('express');
const app = express();
require('dotenv').config();
const cors = require("cors");
const db = require('./db/db');

app.use(express.json());

app.use(cors());

/* ==================== */
const roleRouter = require("./routers/routes/roleRouter")
const usersRouter = require("./routers/routes/usersRouter")
const loginRouter = require("./routers/routes/loginRouter")
const businessRouter = require("./routers/routes/businessRouter")
const imageRouter = require("./routers/routes/imageRouter")
const commentsRouter = require("./routers/routes/commentsRouter")
const ratingRouter = require("./routers/routes/ratingRouter")
const creditCardsRouter = require("./routers/routes/creditCardsRouter")
const reservationsRouter = require("./routers/routes/reservationsRouter")

/* ==================== */
app.use("/role",roleRouter)
app.use("/users",usersRouter)
app.use("/login",loginRouter)
app.use("/business",businessRouter)
app.use("/image",imageRouter)
app.use("/comments",commentsRouter)
app.use("/rating",ratingRouter)
app.use("/creditCards",creditCardsRouter)
app.use("/reservations",reservationsRouter)


/* ==================== */
const PORT = 5000;
app.listen(PORT, () => {
  console.log('SERVER IS WORKING ON http://localhost:' + PORT);
});
