import "dotenv/config";
import jwt from "jsonwebtoken";

export const authenticateToken = (req, res, next) => {
  const token = req.header("Authorization")?.split(" ")[1];

  if (!token) {
    return res.status(401).send("token expired");
  }

  jwt.verify(token, process.env.JWT_SECRET_KEY, (error, user) => {
    if (error) {
      return res.status(403).send("Invalid or Expired token");
    }
    req.user = user;
    next();
  });
};
