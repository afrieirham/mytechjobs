// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { notifyTelegram } from "../../helpers/notifyTelegram";

export default async function handler(req, res) {
  try {
    await notifyTelegram("hello");
    res.status(200).json({ name: "John Doe" });
  } catch (error) {
    res.status(500).json({ name: "error" });
  }
}
