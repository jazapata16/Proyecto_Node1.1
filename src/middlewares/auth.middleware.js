import jwt from "jsonwebtoken";
import { TOKEN_SECRET } from "../config.js";

export const auth = (req, res, next) => {
  try {
    const { token } = req.cookies;

    if (!token)
      return res
        .status(401)
        .json({ message: "No token, authorization denied" });

    jwt.verify(token, TOKEN_SECRET, (error, user) => {
      if (error) {
        return res.status(401).json({ message: "Token is not valid" });
      }
      req.user = user;
      next();
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const authadmin = (req, res, next) => {
  try {
    const { username, email, password } = req.body;
    const userFound = User.findOne({ email });
    const { token } = req.cookies;
    if (!token)
      return res
        .status(401)
        .json({ message: "No token admin, authorization denied" });

    jwt.verify(token, TOKEN_SECRET, (error, user) => {
      if (error) {
        return res.status(401).json({ message: "Token is not valid" });
      }
      if (!userFound.Admin)
        return res.status(400).json({message: ["You're not an admin"],
      });
      req.user = user;
      next();
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};


export const authoperador = (req, res, next) => {
  try {
    const { token } = req.cookies;
    console.log(req.cookies)
    if (!token)
      return res
        .status(401)
        .json({ message: "No token, authorization denied" });

    jwt.verify(token, TOKEN_SECRET, (error, user) => {
      if (error) {
        return res.status(401).json({ message: "Token is not valid" });
      }
      if (!user.username)
        console.log(user)
        return res.status(400).json({message: ["The user is not an operador"],
      });
      req.user = user;
      next();
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};