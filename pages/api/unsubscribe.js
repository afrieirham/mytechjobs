import axios from "axios";
import Cryptr from "cryptr";

const baseUrl = "https://api.sendinblue.com/v3/contacts/";

export default async function handler(req, res) {
  const { method, body } = req;

  if (method !== "POST") {
    return res.status(405).json({ status: "not allowed" });
  }

  const cryptr = new Cryptr(process.env.UNSUBSCRIPTION_SECRET);
  const email = cryptr.decrypt(body.token);
  const url = baseUrl + email;

  try {
    const { data } = await axios.delete(url, {
      headers: { "api-key": process.env.SENDINBLUE_API_KEY },
    });

    return res.status(200).json({ message: data.message });
  } catch (error) {
    return res.status(200).json({ message: error.response.data.message });
  }
}
