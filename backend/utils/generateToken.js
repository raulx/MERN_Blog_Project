import jwt from "jsonwebtoken";

const JWT_SECRET = "this is my little secret";

const generateToken = (res, userId) => {
  const token = jwt.sign({ userId }, JWT_SECRET, { expiresIn: "30d" });

  res.cookie("token", token, {
    maxAge: 900000,
    httpOnly: true,
    sameSite: "strict",
  });
};

export default generateToken;
