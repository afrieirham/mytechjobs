import { connect } from "../libs/mongoose";
import { User } from "../schemas/User";

export const createUser = async (data) => {
  await connect();
  await User.create(data);
};

export const getUserBySessionId = async (id) => {
  await connect();
  const user = await User.findOne({ superTokensId: id });
  if (!user) throw new Error("Invalid user");
  return { user };
};
