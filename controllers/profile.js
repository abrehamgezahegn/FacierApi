const getProfile = db => (req, res) => {
	const { id } = req.params;
	db.select("*")
		.from("users")
		.where({ id })
		.then(user => {
			if (user.length) {
				res.json(user[0]);
			} else {
				res.status(400).json("user not found");
			}
		})
		.catch(err => res.status(400).json("something went wrong"));
};

module.exports = {
	getProfile
};
