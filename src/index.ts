import express from "express";
import { MongoClient } from "mongodb";
import dotenv from "dotenv";

dotenv.config({ path: __dirname + "/../.env" });

const app = express();
// MongoClient.connect(
//   `mongodb://${process.env.DB_HOSTNAME}:${process.env.DB_PORT}/${process.env.DB_DATABASE}}`
// )
//   .then((result) => {
//     console.log("MognoDB connection success");
//     console.log(result);
//   })
//   .catch((err) => {
//     console.log("MognoDB connection error");
//     console.log(err.message);
//   });

app.listen(3001, () => {
  console.log(`Example app listening on port ${process.env.BACKEND_PORT}`);
});

app.get("/", async (req, res) => {
  await MongoClient.connect(
    `mongodb://${process.env.DB_HOSTNAME}:${process.env.DB_PORT}/${process.env.DB_DATABASE}}`
  )
    .then((result) => {
      res.send("MognoDB connection success");
      console.log(result);
    })
    .catch((err) => {
      res.send("MognoDB connection error");
      console.log(err.message);
    });
});
