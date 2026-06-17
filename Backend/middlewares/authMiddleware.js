// import jwt from "jsonwebtoken";

// export const authMiddleware = (req, res, next) => {

//   const token = req.header("Authorization");

//   if (!token) {
//     return res.status(401).json({
//       message: "Access Denied"
//     });
//   }

//   try {

//     const verified = jwt.verify(
//       token,
//       process.env.JWT_SECRET
//     );

//     req.user = verified;

//     next();

//   } catch (err) {

//     res.status(401).json({
//       message: "Invalid Token"
//     });

//   }

// };


import jwt from "jsonwebtoken";

export const authMiddleware = (req, res, next) => {
  const authHeader = req.header("Authorization");

  if (!authHeader) {
    return res.status(401).json({ message: "Access Denied" });
  }

  const token = authHeader.split(" ")[1]; // 🔥 FIX

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified;
    next();
  } catch (err) {
    res.status(401).json({ message: "Invalid Token" });
  }
};