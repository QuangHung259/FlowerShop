const express = require("express");
const router = express.Router();

// Route lấy danh sách vận chuyển
router.get("/", (req, res) => {
  res.json({ message: "Thông tin vận chuyển" });
});

module.exports = router;
