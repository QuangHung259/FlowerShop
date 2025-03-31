const express = require("express");
const {
  getUsers,
  registerUser,
  loginUser,
} = require("../controllers/userController");

console.log("getUsers:", getUsers);
console.log("registerUser:", registerUser);
console.log("loginUser:", loginUser);

console.log("getUsers:", typeof getUsers);
console.log("registerUser:", typeof registerUser);
console.log("loginUser:", typeof loginUser);

const { authMiddleware } = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/", getUsers);
router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/profile", authMiddleware, (req, res) => {
  res.json({ message: "Bạn đã truy cập vào trang cá nhân", user: req.user });
});

module.exports = router;
