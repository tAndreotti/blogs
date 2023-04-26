const express = require("express");
const router = express();

router.use("/api/users", require("./UserRoutes"));

// text route
router.get("/", (req, res) => {
    res.send("API runfando");
});

module.exports = router;