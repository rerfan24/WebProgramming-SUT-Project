const express = require("express");
const router = express.Router();
const { Users, OCounters } = require("../models");
const bcrypt = require("bcrypt");
const multer = require("multer");
const { validateToken, setToken} = require("../middlewares/AuthMiddleware");
const { sign } = require("jsonwebtoken");

router.post("/auth", async (req, res) => {
  const { username, password, email } = req.body;
  const check = await Users.findOne({ where: { username: username } });
  const check2 = await Users.findOne({ where: { email: email } });
  if (check) {
    res.json("Username Already Exist");
  } 
  else if (check2) {
    res.json("Email Belong To Another Account");
  }
  else {
    bcrypt.hash(password, 10).then((hash) => {
        Users.create({
            username: username,
            password: hash,
            email: email,
            firstName: null,
            lastName: null,
            birthday: null,    
        });
        res.json("SUCCESS");
    });
  }
});

router.post("/login", async (req, res) => {
  console.log(req.body)
  const { username, password } = req.body;

  const user = await Users.findOne({ where: { username: username }, include: [OCounters] });

  if (!user) res.json({ error: "User Doesn't Exist" });
  else {
    bcrypt.compare(password, user.password).then(async (match) => {
      if (!match) res.json({ error: "Wrong Username And Password Combination" });
      else {
      const accessToken = sign(
        { username: user.username, id: user.id },
        "importantsecret"
      );
      setToken("importantsecret")
      res.json({ token: accessToken, username: username, id: user.id, photo: user.photo, Ocounters: user.OCounters });
      }
    });
  }
});

router.get("/auth", validateToken, (req, res) => {
  res.json(req.user);
});

router.get("/basicinfo/:id", async (req, res) => {
  const id = req.params.id;

  const basicInfo = await Users.findByPk(id, {
    attributes: { exclude: ["password"] },
  });

  res.json(basicInfo);
});

module.exports = router;
