const User = require("./model");

const { check, validationResult } = require("express-validator");

exports.getUserById = (req, res, next, id) => {
  User.findById(id).exec((err, user) => {
    if (err || !user) {
      return res.status(400).json({
        error: "No user was found in DB",
      });
    }
    req.user = user;
    next();
  });
};
exports.createCategory = (req, res) => {
  const user = new User(req.body);
  user.save((err, category) => {
    if (err) {
      return res.status(400).json({
        error: "NOT able to save category in DB",
      });
    }
    res.json({ category });
  });
};

exports.getUser = (req, res) => {
  return res.json(req.user);
};

exports.getAllUser = (req, res) => {
  User.find().exec((err, user) => {
    if (err) {
      return res.status(400).json({
        err: "NOT able get users in DB",
      });
    }
    res.json(user);
  });
};
