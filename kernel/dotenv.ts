import dotenv from "dotenv";

const envConfig = () =>
  dotenv.config({
    path: [".env", ".env.local"],
  });

export default envConfig;
