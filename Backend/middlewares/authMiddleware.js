import jwt from "jsonwebtoken";

export const authMiddleware = (req, res, next) => {

  console.log("AUTH HEADER:");
  console.log(req.header("Authorization"));

  const authHeader = req.header("Authorization");

  if (!authHeader) {
    return res.status(401).json({
      message: "Access Denied"
    });
  }

  const parts = authHeader.split(" ");

  if (parts.length !== 2 || parts[0] !== "Bearer") {
    return res.status(401).json({
      message: "Invalid Authorization format"
    });
  }

  const token = parts[1];

  try {

    const verified = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    console.log("Decoded token:");
    console.log(verified);

    req.user = verified;

    next();

  } catch (err) {

    console.log(err);

    return res.status(401).json({
      message: "Invalid or expired token"
    });

  }

};