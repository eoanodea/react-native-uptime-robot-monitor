import getEnvVars from '../../environment';

const { uptimeRobotKey } = getEnvVars();

const objToForm = () => {
  const details = {
    api_key: uptimeRobotKey,
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
