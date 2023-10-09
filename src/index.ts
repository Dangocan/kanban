import express from "express";
import dotenv from "dotenv";
import { connectToDatabase } from "./utils/database.utils";

dotenv.config({ path: __dirname + "/../.env" });

const app = express();

app.listen(process.env.BACKEND_PORT, () => {
  console.log(`Example app listening on port ${process.env.BACKEND_PORT}`);
});

app.get("/", async (req, res) => {
  const { connectionSuccess } = await connectToDatabase();
  res.send("Hello World! " + connectionSuccess);
});
