const express = require('express');
const router = express.Router();

router.get('/student', (req, res) => {
  res.json({
    name: "Jay Kumar",
    studentId:"223558027"
  });
});

module.exports = router;
