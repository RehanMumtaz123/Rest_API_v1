const router = require("express").Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../modals/user");

router.post("/", (req, res) => {
  //then validate the request
  const { name, email, password } = req.body;

  if (!email || !password) {
    return res.status(422).json({ Error: "All fields need to be filled! " });
  }

  User.findOne({ email: email }, (err, result) => {
    if (err) {
      throw err;
    }
    if (result) {
      bcrypt
        .compare(password, result.password) //1st param is the request in passwd & 2nd param is db password
        .then((match) => {
          if (match) {
            const accessToken = jwt.sign(
              { id: result._id, name: result.name, email: result.email },
              `${process.env.JWT_TOKEN_SECRET}`,
              { expiresIn:'2h'}
            );
            return res.send({ accessToken: accessToken, type: "bearer" });
          }
          return res.status(401).json({ Error: "Email or password is wrong" });
        })
        .catch((error) => {
          throw error;
        });
    } else {
      return res.status(401).json({ Error: "Email or password is wrong" });
    }
  });
});

module.exports = router;
