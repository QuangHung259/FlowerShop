const express = require("express");
const {
  getUsers,
  registerUser,
  loginUser,
} = require("../controllers/userController");
const { authMiddleware } = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/", getUsers); // Có thể sau này bạn muốn isAdmin
router.post("/register", registerUser);
router.post("/login", loginUser);

// 👇 Chỉ người dùng đã login mới truy cập được profile
router.get("/profile", authMiddleware, (req, res) => {
  res.json({ message: "Bạn đã truy cập vào trang cá nhân", user: req.user });
});

module.exports = router;
