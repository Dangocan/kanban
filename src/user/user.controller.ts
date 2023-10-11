import { Router } from "express";
import { UserService } from "./user.service";
import { checkJwtToken } from "../middlewares/jwtValidation";

const routePrefix = "/user";
const UserRouter = Router();

UserRouter.use(checkJwtToken);

UserRouter.get(`${routePrefix}`, async (req, res) => {
  const { boardId } = req.body;
  try {
    const allBoardsParticipating = await UserService.getAllByBoardId(boardId);
    res.status(200).json(allBoardsParticipating);
  } catch (error) {
    res.status(500).json({ message: "Board search failed" });
  }
});

export { UserRouter };
