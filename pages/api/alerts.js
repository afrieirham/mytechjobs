import Cryptr from "cryptr";
import queryString from "query-string";
import nodemailer from "nodemailer";
import axios from "axios";
import { format } from "date-fns";

import { getWeeklyJobs } from "../../controllers/jobs";

export default async function handler(req, res) {
  const { method, body } = req;

  if (method !== "POST") {
    return res.status(405).json({ status: "not allowed" });
  }

  // verify valid request
  const { secret } = body;
  const isSecretValid = secret === process.env.ALERT_SECRET;
  if (!isSecretValid) {
    return res.status(400).json({ status: "no body" });
  }

  // get list of subscribers
  const url = "https://api.sendinblue.com/v3/contacts";
  const { data } = await axios.get(url, {
    headers: { "api-key": process.env.SENDINBLUE_API_KEY },
  });
  const subscribers = data?.contacts;

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

  const email_body = jobList.join("<br/><br/>");

  // setup email & send
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    auth: {
      user: process.env.SMTP_EMAIL,
      pass: process.env.SMTP_PASSWORD,
    },
  });

  const cryptr = new Cryptr(process.env.UNSUBSCRIPTION_SECRET);

  const $email = subscribers.map((subscriber) => {
    const { email, attributes } = subscriber;
    const name = attributes.FIRSTNAME;

    // setup unsubscribe link
    const unsubscribe_link = queryString.stringifyUrl({
      url: "https://kerja-it.com/emails/unsubscribe",
      query: { email, token: cryptr.encrypt(email) },
    });

    // setup email
    const email_header = `Hi ${name}, here are new jobs this week 🥳<br/><br/>`;
    const email_footer = `Tired of getting this email? <a href="${unsubscribe_link}" target="_blank">Unsubscribe</a>`;
    const html = `${email_header}<br/><br/>${email_body}<br/><br/><br/><br/>${email_footer}`;

    const date = format(new Date(), "dd/MM");
    const subject = `New jobs this week (${date})`;
    return transporter.sendMail({
      from: '"🔔 Kerja IT Job Alerts" <alerts@kerja-it.com>',
      to: email,
      subject,
      html,
    });
  });

  await Promise.all($email);

  res.json({ status: "OK" });
}
