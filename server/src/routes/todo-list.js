const router = require("express").Router();
const checkToken = require("./token-expiration");
const List = require("../model/list/list");

router.get("/get", checkToken, async (req, res) => {
	const currentUserId = res.locals.id;

	try {
		const currentListData = await List.findOne({ user_id: currentUserId });

		res.send({ status: 'success', response: currentListData.lists })
	} catch (err) {
		res.status(400).send({ status: "error", message: 'failed to get data' })
	}
})

router.put("/put", checkToken, async (req, res) => {
	const currentUserId = res.locals.id;

	try {
		await List.updateOne({ user_id: currentUserId }, {
			$push: { lists: req.body }
		});

		res.send({ status: 'success', message: 'list created' })
	} catch (err) {
		res.status(400).send({ status: "error", message: 'failed to create the list' })
	}
})

router.delete("/delete", checkToken, async (req, res) => {
	const currentUserId = res.locals.id;

	try {
		await List.updateOne({ user_id: currentUserId }, {
			$pull: {
				lists: { _id: req.body.id }
			}
		});

		res.send({ status: 'success', message: 'list deleted' })
	} catch (err) {
		res.status(400).send({ status: "error", message: 'failed to delete the list' })
	}
})

module.exports = router;