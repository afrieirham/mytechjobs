import fetch from "node-fetch";

export const getUrlBody = async (url) => fetch(url).then((res) => res.text());
