import queryString from "query-string";
import fetch from "node-fetch";

export const notifyTelegram = (text, isCustomer = false) => {
  const token = process.env.TELEGRAM_HTTP_TOKEN;
  const chat_id = isCustomer
    ? process.env.TELEGRAM_CHAT_ID
    : process.env.TELEGRAM_CHAT_ID_ADMIN;

  // send telegram notification
  const url = `https://api.telegram.org/bot${token}/sendMessage`;
  const telegramUrl = queryString.stringifyUrl({
    url,
    query: { chat_id, text },
  });
  return fetch(telegramUrl);
};
