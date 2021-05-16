const router = require("express").Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../modals/user");
const auth = require("../Middleware/auth");

router.get("/",auth,(req, res) => {
    console.log("uuuu::",req.user.email)
  User.findOne({ email: req.user.email })
  .select('-password').exec((err,result)=>{ // -passwd means hum passwd field nh chahty response me
      if (err) {
          throw err
      }
      res.send(result);
  });
});


module.exports = router;

