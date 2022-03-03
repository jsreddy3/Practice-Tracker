import bodyParser from "body-parser";
import cors from "cors";
import express from "express";
import { MongoClient } from "mongodb";

let DATABASE_NAME = "practice_tracker";

const api = express.Router();
let conn = null;
let db = null;
let Users = null;
let Posts = null;

const initApi = async app => {
  app.set("json spaces", 2);
  app.use("/api", api);
  conn = await MongoClient.connect("mongodb://localhost");
  db = conn.db("practice_tracker");
  Users = db.collection("users");
  Posts = db.collection("practices");
};

api.use(bodyParser.json());
api.use(cors());

api.get("/", (req, res) => {
  res.json({ message: "Hello, world!" });
});

export default initApi;
