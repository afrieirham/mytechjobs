import { ObjectId } from "mongodb";
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

export const updateProfile = async (profile) => {
  await connect();
  const { superTokensId } = profile;

  try {
    await User.findOneAndUpdate({ superTokensId }, profile);
    return [true, null];
  } catch (error) {
    return [false, error];
  }
};

export const getPublicDevelopers = async () => {
  await connect();

  try {
    const users = await User.aggregate([
      {
        $match: {
          status: {
            $in: ["active", "open"],
          },
        },
      },
      { $project: { headline: 1, bio: 1, status: 1 } },
    ]);

    return [users, null];
  } catch (error) {
    return [null, error];
  }
};

export const getPublicDeveloperById = async (id) => {
  await connect();

  try {
    const user = await User.aggregate([
      { $match: { _id: ObjectId(id) } },
      { $limit: 1 },
      {
        $project: {
          bio: 1,
          status: 1,
          headline: 1,
          positions: 1,
          jobTypes: 1,
          jobLevels: 1,
          arrangements: 1,
          locations: 1,
          availableDate: 1,
        },
      },
    ]);

    return [user[0], null];
  } catch (error) {
    return [null, error];
  }
};
