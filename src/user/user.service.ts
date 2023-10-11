import { UserModel } from "./user.entity";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { BoardModel } from "../board/board.entity";

const UserService = {
  async register(name: string, email: string, password: string) {
    if (!name || !email || !password) {
      throw new Error("Missing required fields");
    }

    const userIfExists = await UserModel.findOne({ email });

    if (userIfExists) {
      throw new Error("User already exists");
    }

    const salt = await bcrypt.genSalt(12);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await UserModel.create({
      name,
      email,
      password: hashedPassword,
    });
    return user;
  },

  async login(email: string, password: string) {
    if (!email || !password) {
      throw new Error("Missing required fields");
    }

    const userIfExists = await UserModel.findOne({ email }, "-password");

    if (!userIfExists) {
      throw new Error("User does not exists");
    }

    const isPasswordCorrect = bcrypt.compare(password, userIfExists.password);

    if (!isPasswordCorrect) {
      throw new Error("Invalid credentials");
    }

    const jwtToken = jwt.sign(
      {
        id: userIfExists.id,
      },
      process.env.JWT_SECRET as string
    );

    return { userIfExists, jwtToken };
  },

  async getAllByBoardId(boardId: string) {
    const boardIfExist = await BoardModel.findById(boardId).populate({
      path: "usersAllowed",
      select: "name",
    });

    if (!boardIfExist) {
      throw new Error("Board not found");
    }

    const users = boardIfExist.usersAllowed;

    return users;
  },
};

export { UserService };
