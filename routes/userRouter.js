const express = require("express");
const userModel = require("../model/user.Model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userRouter = express.Router();

userRouter.post("/register", async (req, res) => {
  const { name, email, password, gender } = req.body;
  try {
    const verify = await userModel.find({ email: email });
    if (verify.length > 0) {
      res.status(400).send("user already exist");
    } else {
      bcrypt.hash(password, 8, async (err, hash) => {
        if (err) {
          res.send(err);
        }
        const user = await userModel.create({
          name,
          email,
          password: hash,
          gender,
        });
        user.save();
        res.status(200).send({
          msg: "The new user has been registered",
          registeredUser: user,
        });
      });
    }
  } catch (error) {
    res.send({ error: error });
  }
});

userRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const verify = await userModel.find({ email: email });
    if (verify.length > 0) {
      const verifyPassword = await bcrypt.compare(password, verify[0].password);
      if (verifyPassword) {
        const token = jwt.sign({ userID: verify[0]._id }, "postManagementApp", {
          expiresIn: "1d",
        });
        res.send({ msg: "Login successful!", token: token });
      } else {
        res.status(400).send("Wrong Credentials");
      }
    } else {
      res.status(400).send("wrong Email");
    }
  } catch (error) {
    res.send({ err: error });
  }
});

module.exports = userRouter;
