const router = require("express").Router();

router.get("/", (req, res) => {
    console.log("Hello! I'm a table connection route!")
})

module.exports = router;