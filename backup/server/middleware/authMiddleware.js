const jwt = require("jsonwebtoken");

exports.checkAdmin = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) return res.status(401).json({ message: "Không có token!" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (decoded.role !== "admin") {
      return res.status(403).json({ message: "Bạn không có quyền!" });
    }
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ message: "Token không hợp lệ!" });
  }
};
