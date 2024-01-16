const router = require("express").Router();
const { check, validationResult } = require("express-validator");
const { users } = require("../db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

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
  async (req, res) => {
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
      return res.status(401).json({
        errors: [
          {
            msg: "This user already exists",
          },
        ],
      });
    }
    const hashedPasword = await bcrypt.hash(password, 10);
    users.push({
      email: email,
      password: hashedPasword,
    });

    const token = jwt.sign(
      {
        email: email,
      },
      "sdasdasdasdasdasgjigjigji",
      {
        expiresIn: 3600000,
      }
    );
    res.json({ token });
  }
);

router.post("/login", async (req, res) => {
  const { password, email } = req.body;
  let user = users.find((user) => {
    return user.email === email;
  });
  if (!user) {
    return res.status(401).json({
      errors: [
        {
          msg: "Invalid credetnitals",
        },
      ],
    });
  }
  let isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(401).json({
      errors: [
        {
          msg: "Invalid credetnitals",
        },
      ],
    });
  }
  const token = jwt.sign(
    {
      email: email,
    },
    "sdasdasdasdasdasgjigjigji",
    {
      expiresIn: 3600000,
    }
  );
  res.json({ token });
});

router.get("/all", (req, res) => {
  res.status(200).json(users);
});
module.exports = router;
