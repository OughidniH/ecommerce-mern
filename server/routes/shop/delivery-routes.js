const express = require("express");
const Delivery = require("../../models/Delivery");

const router = express.Router();

router.get("/wilayas", async (req, res) => {
  try {
    const wilayas = await Delivery.find({}, "wilaya");
    res.json(wilayas);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/wilayas/:wilaya", async (req, res) => {
  try {
    const delivery = await Delivery.findOne({ wilaya: req.params.wilaya });

    if (!delivery) {
      return res.status(404).json({ error: "Wilaya not found" });
    }

    res.json(delivery);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;