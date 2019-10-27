const router = require("express").Router();
const checkToken = require("./tokenExpiration");

router.get("/get", checkToken, async (req, res) => {

	res.json({ status: 'success'})
})

module.exports = router;