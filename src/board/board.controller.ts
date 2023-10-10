import { Router } from "express";
import { BoardService } from "./board.service";
import { checkJwtToken } from "../middlewares/jwtValidation";

const routePrefix = "/board";
const BoardRouter = Router();

BoardRouter.use(checkJwtToken);

BoardRouter.post(`${routePrefix}`, async (req, res) => {
  const { title, usersAllowed, createdBy } = req.body;
  try {
    const newBoard = await BoardService.createBoard(
      title,
      usersAllowed,
      createdBy
    );
    res.status(201).json(newBoard);
  } catch (error) {
    res.status(500).json({ message: "Board creation failed" });
  }
});

export { BoardRouter };
