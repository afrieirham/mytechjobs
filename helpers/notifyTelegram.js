import { stringifyUrl } from "query-string";
import fetch from "node-fetch";

export const notifyTelegram = (text) => {
  const token = process.env.TELEGRAM_HTTP_TOKEN;
  const chat_id = process.env.TELEGRAM_CHAT_ID;

  // send telegram notification
  const url = `https://api.telegram.org/bot${token}/sendMessage`;
  const telegramUrl = stringifyUrl({
    url,
    query: { chat_id, text },
  });
  return fetch(telegramUrl);
};
