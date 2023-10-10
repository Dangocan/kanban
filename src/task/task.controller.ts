import { Router } from "express";
import { TaskService } from "./task.service";
import { checkJwtToken } from "../middlewares/jwtValidation";

const routePrefix = "/task";
const TaskRouter = Router();

TaskRouter.use(checkJwtToken);

TaskRouter.get(`${routePrefix}/debbug`, async (req, res) => {
  res.status(201).json({});
});

TaskRouter.post(`${routePrefix}`, async (req, res) => {
  const { title, description, boardId, userInCharge } = req.body;
  const newTask = await TaskService.createTask(
    title,
    description,
    boardId,
    userInCharge
  );
  res.status(201).json({});
});

export { TaskRouter };
