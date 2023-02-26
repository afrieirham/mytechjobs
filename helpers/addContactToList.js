import axios from "axios";

export const addContactToList = async ({ name, email }) => {
  // https://developers.sendinblue.com/reference/createcontact
  const baseUrl = "https://api.sendinblue.com/v3/contacts";

  try {
    const config = { headers: { "api-key": process.env.SENDINBLUE_API_KEY } };
    const redBody = {
      email: email,
      listIds: [9],
      attributes: { FIRSTNAME: name },
      updateEnabled: true,
    };

    await axios.post(baseUrl, redBody, config);

    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};
