require("dotenv").config();

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const knex = require("knex");
const bcrypt = require("bcrypt");
const register = require("./controllers/register");
const signIn = require("./controllers/signIn");
const profile = require("./controllers/profile");
const image = require("./controllers/image");

const dbConfig = require("./database/knexfile");

const app = express();
const db = knex(dbConfig.development);

app.use(bodyParser.json());
app.use(cors());

app.get("/", (req, res) => {
  res.json("welocme to home");
});

app.post("/signin", signIn.handleSignIn(db, jwt, bcrypt));

app.post("/register", register.handleRegister(db, jwt, bcrypt));

app.get("/profile/:id", profile.getProfile(db));

app.put("/image", image.incrementEntrie(db, jwt));

app.listen(4000, () => {
  console.log("app is running in port 4000");
});
