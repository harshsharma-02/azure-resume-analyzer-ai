import jwt from "jsonwebtoken";

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({
      message: "Access Denied",
    });
  }

  try {
    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET,

      // console.log("AUTH HEADER:", authHeader),
      // console.log("TOKEN:", token),
    );

    req.user = decoded;

    next();
  } catch (error) {
    console.error("JWT ERROR:", error);
    return res.status(401).json({
      message: "Invalid Token",
    });
  }
};

export default authMiddleware;
