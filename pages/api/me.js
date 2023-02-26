import { getUserBySessionId } from "../../controllers/users";

export default async function handler(req, res) {
  const id = req?.query?.id;

  if (!id) {
    return res.status(204);
  }

  const raw = await getUserBySessionId(id);
  const data = JSON.parse(JSON.stringify(raw.user));

  return res.json({ name: data.name, status: data.status });
}
