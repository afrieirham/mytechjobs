import { updateUserMetadata } from "supertokens-node/recipe/usermetadata";
import { updateProfile } from "../../controllers/users";

export default async function handler(req, res) {
  const { method, body } = req;

  if (method !== "POST") {
    return res.status(405).json({ status: "not allowed" });
  }

  // verify valid request
  if (!body) {
    return res.status(400).json({ status: "no body" });
  }

  const [success, error] = await updateProfile(body);
  if (error) {
    return res.status(400).json({ error, msg: "something went wrong" });
  }

  await updateUserMetadata(body.superTokensId, { first_name: body.name });

  return res.json({ msg: "profile updated", status: success });
}
