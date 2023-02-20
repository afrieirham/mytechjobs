import { getPublicDeveloperById } from "../../../controllers/users";

export default async function handler(req, res) {
  const [dev, error] = await getPublicDeveloperById(req.query.id);
  res.status(200).json({ dev, error });
}
