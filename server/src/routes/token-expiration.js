const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
	const token = req.header('Auth-Token');

	if (!token) return res.status(401).send({ status: 'denied', message: 'access denied' });

	try {
		res.locals.id = jwt.verify(token, process.env.TOKEN_SECRET).id;
	} catch (error) {
		return res.status(401).send({ status: 'token expired', message: 'session expired, please login in' });
	}

	next();
}