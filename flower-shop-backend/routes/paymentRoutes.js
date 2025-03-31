const express = require("express");
const router = express.Router();

// Route xử lý thanh toán
router.get("/", (req, res) => {
  res.json({ message: "Xử lý thanh toán" });
});

module.exports = router;
