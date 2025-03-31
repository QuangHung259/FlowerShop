const express = require("express");
const router = express.Router();

// Route lấy danh sách đánh giá
router.get("/", (req, res) => {
  res.json({ message: "Danh sách đánh giá" });
});

module.exports = router;
