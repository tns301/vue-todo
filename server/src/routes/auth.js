const router = require("express").Router();
const bycrpt = require("bcryptjs");
const { validateRegister } = require("../model/user/validation");
const jwt = require('jsonwebtoken');
const User = require("../model/user/user");
const List = require("../model/list/list");
const listExample = require("../model/list/list-example")

router.post("/register", async (req, res) => {
	if (req.body.password !== req.body.passwordConfirm) return res.status(400).send({ status: "error", message: 'password does not match' })

	const { error } = await validateRegister(req.body);
	if (error) return res.status(400).send({ status: "error", message: error.details[0].message })

	const emailExist = await User.findOne({ email: req.body.email });
	if (emailExist) return res.status(400).send({ status: "error", message: 'email is already in use, please choose another email' })

	const salt = await bycrpt.genSalt(10);
	const hashedPassword = await bycrpt.hash(req.body.password, salt);

	const USER = new User({
		firstName: req.body.firstName,
		lastName: req.body.lastName,
		email: req.body.email,
		password: hashedPassword,
		avatar: "0" || req.body.avatar
	});

	try {
		await USER.save(); // Generate User

		const user = await User.findOne({ email: req.body.email });
		const LIST = new List({
			user_id: user._id,
			lists: listExample
		});

		await LIST.save(); // Generate List

		res.send({ status: "success", message: 'account created' });
	} catch (err) {
		res.status(400).send({ status: "error", message: err })
	}
});

router.post("/login", async (req, res) => {
	const user = await User.findOne({ email: req.body.email });
	if (!user) return res.status(400).send({ status: "error", message: 'email or password is invalid' })

	const validPassword = await bycrpt.compare(req.body.password, user.password)
	if (!validPassword) return res.status(400).send({ status: "error", message: 'email or password is invalid' })

	const token = jwt.sign({ id: user._id }, process.env.TOKEN_SECRET, { expiresIn: '7d' })

	res.header('Auth-Token', token).send({ status: "success", message: "logged in" });
});

module.exports = router;