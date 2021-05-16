const router = require("express").Router();
const User = require("../modals/user");
const Refresh = require("../modals/refresh");
const jwt = require("jsonwebtoken");

router.post("/", (req, res) => {
  if (!req.body.token) {
    return res.status(401).json({ error: "invalid token" });
  }
  Refresh.findOne({ token: req.body.token })
    .then((doc) => {
      if (doc) {
        jwt.verify(
          req.body.token,
          process.env.JWT_REFRESH_SECRET,
          (err, user) => {
            if (err) {
              return res.sendStatus(403);
            }
            //jwt
            const accessToken = jwt.sign(
              { id: user._id, name: user.name, email: user.email },
              `${process.env.JWT_TOKEN_SECRET}`,
              { expiresIn: "2h" }
            )
            return res.status(401).json({ accessToken, type: "bearer" });
          }
        );
      }
    return res.status(401).json({ error: "invalid token" });
    })
    .catch((error) => {
      throw error;
    });
});

module.exports = router;
