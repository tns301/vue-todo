const router = require("express").Router();
const checkToken = require("./tokenExpiration");
const User = require("../model/user/user");

router.get("/get", checkToken, async (req, res) => {
	const currentUserId = res.locals.id;
	const currentUserData = await User.findOne({ _id: currentUserId });

	const userData = {
		name: currentUserData.name,
		email: currentUserData.email
	}

	res.send({ status: 'success', response: userData })
})

module.exports = router;