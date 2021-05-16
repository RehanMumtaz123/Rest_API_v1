const router = require("express").Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../modals/user");
const Refresh = require("../modals/refresh");

router.post("/",(req, res) => {
  //authorize first the request

  //then validate the request
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(422).json({ Error: "All fields need to be filled! " });
  }
  /// checking if the user exist
  User.exists({ email }, async  (err, res) => {
    // it is cheching in first param here is the email in db or not
    if (err) {
      res.status(500).json({ error: "Internal server error" });
    }
    if (res) {
      // if user exists then we cannt the register with the same email
      res.status(422).json({
        error:
          "User exists, cannot make a new account with the given email address",
      });
    } else {
      // we can register the user since it donot have no account
      // when creating acc. do hash the passwd before storing it
      const hashedPassword = await bcrypt.hash(password, 10); //2nd param salt round
      console.log('sgsg',hashedPassword)
      new User({
        name: name,
        email: email,
        password: hashedPassword
      })
        .save()
        .then((user) => {
          //we will send jwt token
          const accessToken = jwt.sign(
            { id: user._id, name: user.name, email: user.email },
            `${process.env.JWT_TOKEN_SECRET}`,
            { expiresIn: "2h" }
          );

          // Refressh token, works like
          // when jwt expires after time limit user dont have to login again refresh token will make another token itself and put it there

          const refreshtoken = jwt.sign(
            { id: user._id, name: user.name, email: user.email },
            `${process.env.JWT_REFRESH_SECRET}`
          );
          new Refresh({
            token: refreshtoken,
          })
            .save()
            .then(() => {
              return res.status(201).send({
                accessToken: accessToken,
                refreshtoken: refreshtoken,
                type: "bearer",
              });
            });
          })
          .catch((error) =>{
            throw error
          })
        
    }
  });
});

module.exports = router;
