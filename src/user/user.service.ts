import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { UserModel } from "./user.entity";
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

    const jwtToken = jwt.sign(
      {
        id: user._id,
      },
      process.env.JWT_SECRET as string
    );

    return { user, jwtToken };
  },

  async login(email: string, password: string) {
    if (!email || !password) {
      throw new Error("Missing required fields");
    }

    const userIfExists = await UserModel.findOne({ email });

    if (!userIfExists) {
      throw new Error("User does not exists");
    }
    const isPasswordCorrect = await bcrypt.compare(
      password,
      userIfExists.password
    );

    if (!isPasswordCorrect) {
      throw new Error("Invalid credentials");
    }

    const jwtToken = jwt.sign(
      {
        id: userIfExists._id,
      },
      process.env.JWT_SECRET as string
    );

    return { user: userIfExists, jwtToken };
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
