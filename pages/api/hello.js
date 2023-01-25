// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { getAllSlugs } from "../../controllers/jobs";

export default async function handler(req, res) {
  const { slugs } = await getAllSlugs();
  res.status(200).json({ name: "John Doe", slugs });
}
