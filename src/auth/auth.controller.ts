import { Router } from "express";
import { UserModel } from "../user/user.entity";
import { UserService } from "../user/user.service";

const routePrefix = "/auth";
const AuthRouter = Router();

AuthRouter.get(`${routePrefix}/debbug`, async (req, res) => {
  const users = await UserModel.create({
    name: "danilo",
    email: "danilo@teste.com",
    boards: [],
    password: "123456",
  });
  res.status(201).json(users);
});

AuthRouter.post(`${routePrefix}/register`, async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const user = await UserService.register(name, email, password);
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
});

AuthRouter.post(`${routePrefix}/login`, async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await UserService.login(email, password);
    res.status(200).json(user);
  } catch (error) {
    res.status(401).json({ message: "Invalid credentials" });
  }
});

export { AuthRouter };
