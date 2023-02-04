import fetch from "node-fetch";
import queryString from "query-string";
import nodemailer from "nodemailer";
import { format } from "date-fns";

import { getWeeklyJobs } from "../../controllers/jobs";

export default async function handler(req, res) {
  const { method, body } = req;

  if (method !== "POST") {
    return res.status(405).json({ status: "not allowed" });
  }

  // verify valid request
  const { secret, api_secret, form_id } = body;

  const isSecretValid = secret === process.env.ALERT_SECRET;
  const isValid = [secret, api_secret, form_id].some(Boolean);

  if (!isSecretValid || !isValid) {
    return res.status(400).json({ status: "no body" });
  }

  // get list of subscribers
  const baseUrl = `https://api.convertkit.com/v3/forms/${form_id}/subscriptions?api_secret=${api_secret}`;
  let queryPage = 1;
  let subscribers = [];
  while (true) {
    const requestUrl = queryString.stringifyUrl({
      url: baseUrl,
      query: { page: queryPage },
    });

    const result = await fetch(requestUrl).then((res) => res.json());
    const { page, total_pages, subscriptions } = result;

    const items = subscriptions?.map((s) => s.subscriber);

    if (items?.length > 0) {
      subscribers.push(...items);
    }

    if (page === total_pages) {
      break;
    }
    queryPage++;
  }

  // get new jobs of the week
  const { jobs } = await getWeeklyJobs();

  // compose email body
  const jobList = jobs.map((j, i) => {
    const url = "https://kerja-it.com/jobs/" + j?.slug;
    const n = i + 1;
    const title = j?.schema?.title ?? j?.title;

    let content = `${n}. <b>${title}</b>`;

    const company = j?.schema?.hiringOrganization?.name;
    const hasCompany = Boolean(company);
    if (hasCompany) {
      content += `<br/><i>${company}</i>`;
    }

    content += `<br/>${url}`;

    const postedAt = format(new Date(j?.postedAt), "do MMM yyyy");
    content += `<br/><sub>Posted on: ${postedAt}</sub>`;

    return content;
  });

  const email_content = jobList.join("<br/><br/>");

  // setup email & send
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.SMTP_EMAIL,
      pass: process.env.SMTP_PASSWORD,
    },
  });

  const $email = subscribers.map((s) => {
    const date = format(new Date(), "dd/MM");
    const subject = `New jobs this week (${date})`;
    return transporter.sendMail({
      from: '"🔔 Kerja IT Job Alerts" <alerts@kerja-it.com>',
      to: s.email_address,
      subject,
      html: `Hi ${s.first_name}, here are new jobs this week 🥳<br/><br/>${email_content}`,
    });
  });

  await Promise.all($email);

  res.json({ status: "OK" });
}
