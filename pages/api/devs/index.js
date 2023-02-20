import { getPublicDevelopers } from "../../../controllers/users";

export default async function handler(req, res) {
  const [devs, error] = await getPublicDevelopers();
  res.status(200).json({ devs, error });
}
