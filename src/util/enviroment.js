import env from "react-dotenv";

export const enviroment = () => {
  let baseUrl = env.API_LOCAL;
  switch (process.env.NODE_ENV) {
    case "development":
      baseUrl = env.API_DEV;
      break;
    case "production":
      baseUrl = env.API_PRODUCTION;
      break;

    default:
      break;
  }
  return baseUrl
};
