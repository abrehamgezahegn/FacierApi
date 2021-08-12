const handleSignIn = (db, jwt, bcrypt) => (req, res) => {
  const { email, password } = req.body;
  console.log(req.body);
  const token = jwt.sign({ email: email }, "1231231", { expiresIn: "15m" });

  db.select("email", "hash")
    .from("login")
    .where("email", "=", email)
    .then((data) => {
      const isValid = bcrypt.compareSync(password, data[0].hash);
      if (isValid) {
        return db
          .select("*")
          .from("user")
          .where("email", "=", email)
          .then((user) => {
            res.json({ user: user[0], token });
          })
          .catch((err) => res.status(400).json({ user: "unable to get user" }));
      } else {
        res.status(400).json("wrong credentials");
      }
    })
    .catch((err) => res.status(400).json("wrong credentials"));
};

module.exports = {
  handleSignIn,
};
