import { Router } from "express";
import { TaskService } from "./task.service";
import { checkJwtToken } from "../middlewares/jwtValidation";

const routePrefix = "/task";
const TaskRouter = Router();

TaskRouter.use(checkJwtToken);

TaskRouter.get(`${routePrefix}`, async (req, res) => {
  const { boardId } = req.body;
  try {
    const tasks = await TaskService.getAllByBoardId(boardId);
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ message: "Task search failed" });
  }
});

TaskRouter.get(`${routePrefix}/:id`, async (req, res) => {
  const { id } = req.params;
  try {
    const taskDetails = await TaskService.getDetails(id);
    res.status(200).json(taskDetails);
  } catch (error) {
    res.status(500).json({ message: "Task search failed" });
  }
});

TaskRouter.post(`${routePrefix}`, async (req, res) => {
  const { title, description, boardId, userInCharge } = req.body;
  try {
    const newTask = await TaskService.createTask(
      title,
      description,
      boardId,
      userInCharge
    );
    res.status(201).json(newTask);
  } catch (error) {
    res.status(500).json({ message: "Task creation failed" });
  }
});

TaskRouter.post(`${routePrefix}/:id`, async (req, res) => {
  const { title, description, boardId, userInCharge } = req.body;
  const { id } = req.params;
  try {
    const updatedTask = await TaskService.updateTask(
      id,
      title,
      description,
      boardId,
      userInCharge
    );
    res.status(201).json(updatedTask);
  } catch (error) {
    res.status(500).json({ message: "Task update failed" });
  }
});

TaskRouter.delete(`${routePrefix}/:id`, async (req, res) => {
  const { id } = req.params;
  try {
    await TaskService.deleteTask(id);
    res.status(200).json({ message: "Task deleted" });
  } catch (error) {
    res.status(500).json({ message: "Task deletion failed" });
  }
});

export { TaskRouter };
