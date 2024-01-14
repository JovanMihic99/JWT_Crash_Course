const router = require("express").Router();
const { check, validationResult } = require("express-validator");
const { users } = require("../db");

router.post(
  "/signup",
  [
    check("email", "Please provide a valid email").isEmail(),
    check(
      "password",
      "Please provide a password that is greater than 5 characters"
    ).isLength({
      min: 6,
    }),
  ],
  (req, res) => {
    console.log(users);
    const { password, email } = req.body;
    // validated the input
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.status(400).json({
        errors: errors.array(),
      });
    }
    // validate if user doesnt already exist
    let user = users.find((user) => {
      return user.email === email;
    });
    if (user) {
      res.status(401).json({
        errors: [
          {
            msg: "This user already exists",
          },
        ],
      });
    }
    res.send("Validation passed");
  }
);

module.exports = router;
