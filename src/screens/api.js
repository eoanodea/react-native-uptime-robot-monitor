import objToForm from '../helpers/urlencodedConverter';

const baseUrl = 'https://api.uptimerobot.com/v2/';

const getAccount = async () => {
  try {
    const response = await fetch(`${baseUrl}getAccountDetails`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: objToForm(),
      redirect: 'follow',
    });
    return response.json();
  } catch (err) {
    return console.log(err);
  }
};

const getMonitors = async () => {
  try {
    const response = await fetch(`${baseUrl}getMonitors`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: objToForm(),
      redirect: 'follow',
    });
    return response.json();
  } catch (err) {
    return console.log(err);
  }
};

export default {
  getAccount,
  getMonitors,
};
