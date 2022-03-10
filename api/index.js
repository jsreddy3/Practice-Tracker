import bodyParser from "body-parser";
import cors from "cors";
import express from "express";
import { MongoClient } from "mongodb";

let DATABASE_NAME = "practice_tracker";

const api = express.Router();
let conn = null;
let db = null;
let Users = null;
let Practices = null;

const initApi = async app => {
  app.set("json spaces", 2);
  app.use("/api", api);
  conn = await MongoClient.connect("mongodb://localhost");
  db = conn.db("practice_tracker");
  Users = db.collection("users");
  Practices = db.collection("practices");
};

api.use(bodyParser.json());
api.use(cors());

api.use("/users/:id", async (req, res, next) => {
  let id = req.params.id;
  let user = await Users.findOne({ id });
  if (!user) {
    res.status(404).json({ error: `No user with ID ${id}`});
    return;
  }

  res.locals.user = user;
  next();
})

api.get("/users/:id", async (req, res) => {
  let user = res.locals.user;
  delete user._id;
  res.json(user);
})

api.post("/users", async (req, res) => {
  let userObj = {
    id: req.body.id,
    practices: []
  }

  await Users.insertOne(userObj);
  delete userObj._id;
  res.json(userObj);
})

api.post("/users/:id/practices", async (req, res) => {
  let user = res.locals.user;
  console.log(req);
  await Practices.insertOne( {
    user: req.body.id,
    location: req.body.location,
    day: req.body.day,
    from: req.body.from,
    to: req.body.to
  });

  res.json( {success: true});
})

api.get("/users/:id/practices", async (req, res) => {
  let user = res.locals.user;
  let practices = await Posts.find( {id: { $in: [user] } } ).toArray();

  let practiceArray = [];
  for (let practice of practices) {
    let practiceUser = await Users.findOne( {id: post.userId } );
    practiceArray.push({
      user: post.userId,
      location: practiceUser.location,
      day: practiceUser.day,
      from: practiceUser.from,
      to: practiceUser.to
    });
  }
  feedArr.sort((a, b) => {
    let a_day = parseInt(a.day);
    let b_day = parseInt(b.day);
    if (a_day == b_day) {
      //let newA =
      let a_hour = parseInt(a.from);
    }
  })
})

export default initApi;
