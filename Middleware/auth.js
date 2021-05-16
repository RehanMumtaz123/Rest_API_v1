const jwt = require("jsonwebtoken");


function auth(req,res,next){
    let authHeader= req.headers.authorization;
    if (authHeader) {
        let token=authHeader.split(' ')[1] // using split to split the token into arrays and obtaining the token only ;
        jwt.verify(token,process.env.JWT_TOKEN_SECRET,(err,data)=>{
            if (err) {
                return res.sendStatus(403);
            }
                console.log('user:',req.user)
                req.user=data
                console.log("reeq==>",req.user,"data  ",data)
                next();
        })
    }
    else{
        res.sendStatus(401)
    }
}

module.exports=auth;