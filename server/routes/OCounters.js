const express = require("express");
const { validateToken } = require("../middlewares/AuthMiddleware");
const router = express.Router();
const { OCounters } = require("../models");

router.get("/", validateToken, async (req, res) => {
    const listOfOCounters = await OCounters.findAll();
    res.json({ listOfOCounters: listOfOCounters});
});
  
router.get("/:id", async (req, res) => {
    const id = req.params.id;
    const counter = await OCounters.findByPk(id);
    res.json(counter);
});
  
router.post("/add", async (req, res) => {
    const counter = req.body;
    counter.photo = "picture/global/christmas.jpg";
    await OCounters.create(counter);
    res.json(counter);
});

module.exports = router;