const router = require("express").Router();
const { check, validationResult } = require("express-validator");

router.post(
  "/signup",
  [
    check("email").isEmail(),
    check("password").isLength({
      min: 6,
    }),
  ],
  (req, res) => {
    const { password, email } = req.body;
    // console.log(password, email);
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.status(400).json({
        errors: errors.array(),
      });
    }
    res.send("Validation pass");
  }
);

module.exports = router;
