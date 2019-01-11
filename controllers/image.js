const incrementEntrie = (db, jwt) => (req, res) => {
	const { id, token } = req.body;

	try {
		const { exp } = jwt.verify(token, "1231231");
		const newToken = jwt.sign({ id: id }, "1231231", {
			expiresIn: "15m"
		});
		db("users")
			.where({ id })
			.increment("entries", 1)
			.returning("entries")
			.then(entries => {
				res.json({ entries: entries[0], token: newToken });
			})
			.catch(err => res.status(400).json("something went wrong"));
	} catch (err) {
		// console.log(err);
		res.status(400).json("invalid token");
	}
};

module.exports = {
	incrementEntrie
};
