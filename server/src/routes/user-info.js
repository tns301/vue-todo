const router = require("express").Router();
const checkToken = require("./token-expiration");
const { validateRegister } = require("../model/user/validation");
const bycrpt = require("bcryptjs");

const User = require("../model/user/user");

router.get("/get", checkToken, async (req, res) => {
	const currentUserId = res.locals.id;
	const currentUserData = await User.findOne({ _id: currentUserId });

	const userData = {
		firstName: currentUserData.firstName,
		lastName: currentUserData.lastName,
		email: currentUserData.email,
		avatar: currentUserData.avatar
	}

	res.send({ status: 'success', response: userData })
})

router.put("/edit", checkToken, async (req, res) => {
	if (req.body.password !== req.body.passwordConfirm) return res.status(400).send({ status: "error", message: 'password does not match' })

	const currentUserId = res.locals.id;

	const { error } = await validateRegister(req.body);
	if (error) return res.status(400).send({ status: "error", message: error.details[0].message })

	const salt = await bycrpt.genSalt(10);
	const hashedPassword = await bycrpt.hash(req.body.password, salt);

	try {
		await User.updateOne({ _id: currentUserId }, {
			$set: {
				firstName: req.body.firstName,
				lastName: req.body.lastName,
				email: req.body.email,
				password: hashedPassword,
				avatar: req.body.avatar
			}
		});

		res.send({ status: "success", message: 'account updated' });
	} catch (err) {
		res.status(400).send({ status: "error", message: err })
	}
})

module.exports = router;