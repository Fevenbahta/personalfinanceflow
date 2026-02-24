import jwt from "jsonwebtoken";

const SECRET_KEY = "your_super_secret_key"; // replace with env variable

export const generateToken = (userId: string) => {
  // Token expires in 7 days
  return jwt.sign({ userId }, SECRET_KEY, { expiresIn: "7d" });
};

export const verifyToken = (token: string) => {
  return jwt.verify(token, SECRET_KEY) as { userId: string };
};