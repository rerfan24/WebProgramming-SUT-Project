const express = require("express");
const router = express.Router();
const { Users } = require("../models");
const bcrypt = require("bcrypt");

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

router.get("/basicinfo/:id", async (req, res) => {
    const id = req.params.id;
  
    const basicInfo = await Users.findByPk(id, {
      attributes: { exclude: ["password"] },
    });
  
    res.json(basicInfo);
  });

module.exports = router;
