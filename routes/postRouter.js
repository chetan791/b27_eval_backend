const express = require("express");
const postRouter = express.Router();
const jwt = require("jsonwebtoken");
const { post } = require("./userRouter");

// Add a new post---------------------------------------------------
postRouter.post("/add", (req, res) => {
  const token = req.headers.authorization.split(" ")[1];
  // const {userId,title,content}
  try {
    const post = postModel(req.body);
    post.save();
    res.send({ msg: "post added", addedPost: post });
  } catch (error) {
    console.log(error);
  }
});

// get all post----------------------------------------------------
postRouter.get("/", async (req, res) => {
  const { device } = req.query;
  const { userID } = req.body;
  try {
    if (device) {
      const post = await postModel.find({ userID: userID, device });
      res.send(post);
    } else {
      const post = await postModel.find({ userID: userID });
      res.send(post);
    }
  } catch (error) {
    console.log(error);
  }
});

// update a single post------------------------------------------------------
postRouter.patch("/update/:id", async (req, res) => {
  const id = req.params.id;
  try {
    await postModel.findByIdAndUpdate(id, req.body);
    res.send({ msg: "post has been updated" });
  } catch (error) {
    console.log(error);
  }
});

//delete a post-----------------------------------------------------
postRouter.delete("/delete/:id", async (req, res) => {
  const id = req.params.id;
  const token = req.headers.authorization.split(" ")[1];
  try {
    jwt.verify(token, "postManagementApp", async (err, decoded) => {
      if (decoded) {
        const id = req.params.id;
        await postModel.findByIdAndDelete(id);
        res.send({ msg: "post has been deleted" });
      } else {
        res.status(400).send("please login first");
      }
    });
  } catch (error) {
    console.log(error);
  }
});

module.exports = { postRouter };
