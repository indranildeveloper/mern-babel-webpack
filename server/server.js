import express from "express";
import path from "path";
import devBundle from "./devBundle";
import template from "../template";
import { MongoClient } from "mongodb";

const CURRENT_WORKING_DIR = process.cwd();

const app = express();
devBundle.compile(app);

app.use("/dist", express.static(path.join(CURRENT_WORKING_DIR, "dist")));

app.get("/", (req, res) => {
  res.status(200).send(template());
});

const url =
  process.env.MONGO_URI || "mongodb://localhost:27017/mernSimpleSetup";

MongoClient.connect(url, (err, db) => {
  console.log("Connected successfully to mongodb server");
  db.close();
});

let port = process.env.PORT || 7000;
app.listen(port, function onStart(err) {
  if (err) {
    console.log(err);
  }
  console.info(`Server started on port ${port}`);
});
