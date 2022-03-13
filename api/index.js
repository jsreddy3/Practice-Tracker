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
  let userName = res.locals.user;
  let practices = await (Practices.find( {user: { $in: [userName.id] } } ).toArray());
  let practiceArray = [];
  for (let practice of practices) {
    practiceArray.push({
      user: practice.user,
      location: practice.location,
      day: practice.day,
      from: practice.from,
      to: practice.to
    });
  }
  practiceArray.sort((a, b) => {
    let currDate = new Date();
    let a_month = stringToMonth(a.day.split(" ")[0]);
    let a_day = a.day.split(" ")[1];
    let b_month = stringToMonth(b.day.split(" ")[0]);
    let b_day = b.day.split(" ")[1];

    let a_date = new Date(currDate.getYear(), a_month, parseInt(a_day));
    let b_date = new Date(currDate.getYear(), b_month, parseInt(b_day));

    if (a_month == b_month && a_day == b_day) {
      let a_time = parseInt(a.from.split(" ")[0]);
      let a_pm = a.from.split(" ")[1];
      let b_time = parseInt(b.from.split(" ")[0]);
      let b_pm = b.from.split(" ")[1];
      if (a_pm == "PM") {
        a_time += 12;
      }
      if (b_pm == "PM") {
        b_time += 12;
      }
      return a_time - b_time;
    }

    return a_date.getTime() - b_date.getTime();
  })
  res.json({practices: practiceArray});
})

function stringToMonth(str) {
  return new Date(Date.parse(str +" 1, 2022")).getMonth();
}

export default initApi;
