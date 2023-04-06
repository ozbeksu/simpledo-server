import dotenv from "dotenv";

dotenv.config();

const {
  NODE_ENV = "dev",
  JWT_SECRET = "f5e5572634f158c8ddedc8f15c1cf4b3",
  PORT = 3000,
} = process.env;

export default {
  env: NODE_ENV,
  debug: NODE_ENV === "dev",
  port: PORT,
  jwtSecret: JWT_SECRET,
};
