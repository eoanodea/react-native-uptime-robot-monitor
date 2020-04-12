import { UPTIME_ROBOT_KEY } from 'react-native-dotenv';

const objToForm = () => {
  const details = {
    api_key: UPTIME_ROBOT_KEY,
    format: 'json',
  };

  let formBody = [];
  for (const property in details) {
    const encodedKey = encodeURIComponent(property);
    const encodedValue = encodeURIComponent(details[property]);
    formBody.push(`${encodedKey  }=${  encodedValue}`);
  }
  formBody = formBody.join('&');

  return formBody;
};

export default objToForm;
