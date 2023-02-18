import { connectDB } from "../libs/mongoose";
import { User } from "../schemas/User";

export const createUser = async (data) => {
  await connectDB();
  await User.create(data);
};
