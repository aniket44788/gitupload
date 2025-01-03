const express = require("express");
const joi = require("joi");
const model = require("../Schema/model");
const signup = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs")

signup.post("/", async (req, res) => {
  const schema = joi.object({
    name: joi.string().required(),
    last: joi.string().required(),
    password: joi.string().required(),
    age: joi.string().required(),
    phone: joi.string().required(),
    gender: joi.string().required(),
  });
  const token = jwt.sign({_id:123456},process.env.KEY)
  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({
      success: false,
      message: error.details[0].message,
    });
  }
  try {
    const existuser = await model.findOne({
      phone: req.body.phone,
    });
    if (existuser) {
      return res.status(400).json({
        success: false,
        message: "phone is already used",
      });
    }
    const password = await bcrypt.hash(req.body.password,10)
    const newuser = new model({
      name: req.body.name,
      last: req.body.last,
      password: password,
      age: req.body.age,
      phone: req.body.phone,
      gender: req.body.gender,
      token: token,
    });
    const students = await newuser.save();
    res.status(201).json({
      message: "Data saved ",
      data: students,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Server is busy",
    });
  }
});

module.exports = signup;
