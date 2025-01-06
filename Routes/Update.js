const express = require("express");
const update = express.Router();
const bcrypt = require("bcryptjs");
const Schema = require("../Schema/model");

update.patch("/:id", async (req, res) => {
  const { id } = req.params;
  const data = req.body;
  try {
    if (data.password) {
      const hashedPassword = await bcrypt.hash(data.password, 10);
      data.password = hashedPassword; 
    }
    const samsung = await Schema.findOneAndUpdate({ _id: id }, { $set: data });
    if (!samsung) {
      return res.status(404).json({ msg: "Record not found" });
    }
    res.status(200).json(samsung);
  } catch (error) {
    console.error(error); 
    res.status(500).json({ msg: "Internal server error" });
  }
});

module.exports = update;
