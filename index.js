const express = require("express");
const app = express();
const connection = require("./db");
const userRouter = require("./routes/userRouter");
const { postRouter } = require("./routes/postRouter");
const auth = require("./middleware/auth.middleware");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();

app.use(cors());
app.use(express.json());

app.use("/users", userRouter);
app.use(auth);
app.use("/posts", postRouter);

app.listen(process.env.port, async () => {
  try {
    await connection;
    console.log("connected to DB");
  } catch (error) {
    console.log(error);
  }
});
