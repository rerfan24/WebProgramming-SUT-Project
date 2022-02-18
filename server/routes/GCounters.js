const express = require("express");
const router = express.Router();
const { GCounters } = require("../models");

router.get("/", async (req, res) => {
  const listOfCounters = await GCounters.findAll();
  res.json({ listOfCounters: listOfCounters});
});

router.get("/:id", async (req, res) => {
  const id = req.params.id;
  const counter = await GCounters.findByPk(id);
  res.json(counter);
});

router.post("/add", async (req, res) => {
    const counter = req.body;
    counter.photo = "picture/global/christmas.jpg";
    await GCounters.create(counter);
    res.json(counter);
});

module.exports = router;