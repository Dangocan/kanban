import dotenv from "dotenv";
import express from "express";
import cors from "cors";

import { AuthRouter } from "./auth/auth.controller";
import { UserRouter } from "./user/user.controller";
import { TaskRouter } from "./task/task.controller";
import { BoardRouter } from "./board/board.controller";
import { connectToDatabase } from "./utils/database.utils";

dotenv.config({ path: __dirname + "/../.env" });

const app = express();

app.use(cors());
app.use(express.json());

app.use(AuthRouter);
app.use(BoardRouter);
app.use(TaskRouter);
app.use(UserRouter);

connectToDatabase().then(({ connectionSuccess }) => {
  app.listen(process.env.BACKEND_PORT, () => {
    console.log(
      `Application listening on port ${process.env.BACKEND_PORT} ${
        connectionSuccess ? "and successfully connected to database" : ""
      }`
    );
  });
});
