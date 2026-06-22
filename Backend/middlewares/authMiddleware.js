import jwt from "jsonwebtoken";

export const authMiddleware = (req, res, next) => {

  console.log("===== AUTH MIDDLEWARE =====");

  console.log("AUTH HEADER:");
  console.log(req.header("Authorization"));

  const authHeader = req.header("Authorization");

  if (!authHeader) {
    return res.status(401).json({
      message: "Access Denied"
    });
  }

  const token = authHeader.split(" ")[1];

  console.log("TOKEN RECEIVED:");
  console.log(token);

  try {

    const verified = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    console.log("TOKEN VERIFIED:");
    console.log(verified);

    req.user = verified;

    next();

  } catch (err) {

    console.log("JWT ERROR:");
    console.log(err);

    return res.status(401).json({
      message: "Invalid or expired token"
    });

  }
};