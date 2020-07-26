const express = require("express");
const router = express.Router();
const { createCategory, getUserById, getUser, getAllUser } = require("./controller");

const { check, validationResult } = require("express-validator");

router.param("userId", getUserById);

router.post(
  "/category",
  [check("email", "email is required").isEmail()],
  createCategory
);

router.get("/category/:userId", getUser);
router.get("/categories", getAllUser);

module.exports = router;
