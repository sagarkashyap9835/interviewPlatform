import jwt from "jsonwebtoken";

const isAuth = (req, res, next) => {
  try {
    const { token } = req.cookies;

    if (!token) {
      return res.status(401).json({ success: false, message: "No token provided" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded || !decoded.userId) {
      return res.status(401).json({ success: false, message: "Invalid token" });
    }

    req.userId = decoded.userId;
    next();
  } catch (error) {
    console.error("Auth middleware error:", error);
    return res.status(401).json({ success: false, message: "Unauthorized" });
  }
};

export default isAuth;