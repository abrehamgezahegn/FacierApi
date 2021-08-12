const handleRegister = (db, jwt, bcrypt) => (req, res) => {
  const { name, email, password } = req.body;
  bcrypt.hash(password, 12, (err, hash) => {
    const token = jwt.sign({ email: email }, "1231231", {
      expiresIn: "15m",
    });

    db.transaction((trx) => {
      trx
        .insert({
          hash: hash,
          email: email,
        })
        .into("login")
        .returning("email")
        .then((loginEmail) => {
          return trx("user")
            .returning("*")
            .insert({
              email: loginEmail[0],
              name: name,
            })
            .then((user) => {
              res.json({ user: user[0], token });
            });
        })
        .then(trx.commit)
        .catch((err) => {
          console.log("reg err", err);
          trx.rollback();
          res.status(400).json({
            message: "User with email is already exists",
            error: "duplicateEmail",
          });
        });
    }).catch((err) => {
      console.log("register err", err);
      res.status(400).json("something went wrong");
    });
  });
};
module.exports = {
  handleRegister: handleRegister,
};
