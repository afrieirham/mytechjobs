import axios from "axios";
import Cryptr from "cryptr";

const WEEKLY_JOB_ALERTS = 3;
const baseUrl = `https://api.sendinblue.com/v3/contacts/lists/${WEEKLY_JOB_ALERTS}/contacts/remove`;

export default async function handler(req, res) {
  const { method, body } = req;

  if (method !== "POST") {
    return res.status(405).json({ status: "not allowed" });
  }

  const cryptr = new Cryptr(process.env.UNSUBSCRIPTION_SECRET);
  const email = cryptr.decrypt(body.token);

  try {
    const config = { headers: { "api-key": process.env.SENDINBLUE_API_KEY } };
    const redBody = { emails: [email] };

    // https://developers.sendinblue.com/reference/removecontactfromlist
    await axios.post(baseUrl, redBody, config);

    return res.status(200).json({ message: "success" });
  } catch (error) {
    return res.status(200).json({ message: error.response.data.message });
  }
}
