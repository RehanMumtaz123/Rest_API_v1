const router = require("express").Router();
const Refresh = require("../modals/refresh");

router.delete('/',(req,res)=>{
    Refresh.deleteOne({ token: req.body.token})
    .then((doc)=>{
        res.sendStatus(200);
        console.log(doc)
    })
    .catch(err=>{throw err})
})

module.exports = router;
