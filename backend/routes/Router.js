const express = require("express");
const router = express();

// text route
router.get("/", (req, res) => {
    res.send("API runfando");
});

module.exports = router;