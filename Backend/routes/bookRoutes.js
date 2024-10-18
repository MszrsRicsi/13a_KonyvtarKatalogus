const router = require("express").Router();

router.get("/", (req, res) => {
    console.log("Hello! I'm a book route!")
})

module.exports = router;