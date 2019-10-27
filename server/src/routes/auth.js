const router = require("express").Router();
const bycrpt = require("bcryptjs");
const { validateRegister, loginRegister } = require("../model/user/validation");
const User = require("../model/user/user");
const jwt = require('jsonwebtoken');

router.post("/register", async (req, res) => {
	const { error } = await validateRegister(req.body);
	if (error) return res.status(400).send({ status: "error", message: error.details[0].message })

	const emailExist = await User.findOne({ email: req.body.email });
	if (emailExist) return res.status(400).send({ status: "error", message: 'email is already in use, please choose another email' })

	const salt = await bycrpt.genSalt(10);
	const hashedPassword = await bycrpt.hash(req.body.password, salt);

	const USER = new User({
		name: req.body.name,
		email: req.body.email,
		password: hashedPassword
	});

	try {
		const savedUSER = await USER.save();
		res.send({ status: "success", message: 'account created', data: { id: savedUSER._id } });
	} catch (err) {
		res.status(400).send({ status: "error", message: err })
	}
});

router.post("/login", async (req, res) => {
	const { error } = await loginRegister(req.body);
	if (error) return res.status(400).send({ status: "error", message: error.details[0].message })

	const user = await User.findOne({ email: req.body.email });
	if (!user) return res.status(400).send({ status: "error", message: 'email or password is invalid' })

	const validPassword = await bycrpt.compare(req.body.password, user.password)
	if (!validPassword) return res.status(400).send({ status: "error", message: 'email or password is invalid' })

	const token = jwt.sign({ id: user._id }, process.env.TOKEN_SECRET, { expiresIn: '7d' })

	res.header('Auth-Token', token).send({ status: "success", message: "logged in" });
});

module.exports = router;