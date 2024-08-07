require('dotenv').config();

exports.handler = async function(event, context) {
  const isDev = process.env.CONTEXT === 'dev';
  const apiKey = isDev ? process.env.GOOGLE_MAPS_API_KEY_DEV : process.env.GOOGLE_MAPS_API_KEY;

  return {
    statusCode: 200,
    body: JSON.stringify({
      apiKey: apiKey
    }),
  };
};
