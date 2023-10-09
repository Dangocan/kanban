import { UserModel } from "./user.entity";
import bcrypt from "bcrypt";

const UserService = {
  async register(name: string, email: string, password: string) {
    if (!name || !email || !password) {
      throw new Error("Missing required fields");
    }

    const userExists = await UserModel.findOne({ email });

    if (userExists) {
      throw new Error("User already exists");
    }

    const salt = await bcrypt.genSalt(12);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await UserModel.create({
      name,
      email,
      password: hashedPassword,
      boards: [],
    });
    return user;
  },

  async login(email: string, password: string) {
    if (!email || !password) {
      throw new Error("Missing required fields");
    }

    const userExists = await UserModel.findOne({ email });

    if (!userExists) {
      throw new Error("User does not exists");
    }

    const isPasswordCorrect = bcrypt.compare(password, userExists.password);

    if (!isPasswordCorrect) {
      throw new Error("Invalid credentials");
    }

    return userExists;
  },
};

export { UserService };
