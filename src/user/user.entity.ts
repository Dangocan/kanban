import mongoose from "mongoose";

interface User {
  id: string;
  name: string;
  email: string;
  password: string;

  boards: { boardId: string; permissionLevel: number }[];
}

const UserSchema = new mongoose.Schema({
  name: String,
  email: { type: String, nullable: false, unique: true, required: true },
  password: { type: String, nullable: false, required: true },
  boards: [{ boardId: String, permissionLevel: Number }],
});

const UserModel = mongoose.model("User", UserSchema);

export { User, UserModel };
