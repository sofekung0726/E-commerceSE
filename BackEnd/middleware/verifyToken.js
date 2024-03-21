const jwt = require("jsonwebtoken");

const verifyToken = (req,res ,next) => {
    console.log(req.headers);
    if (!req.headers.authorization) {
        return res.status(401).send({message:"Unauthorize Access1111"})
    }
    const token = req.headers.authorization.split(" ")[1];
    jwt.verify(token,process.env.ACCESS_TOKEN_SECRET, (err , decoded)=> {
        if (err) {
            res.status(401).send({message:"Unauthorize Access 11"})
        }
        req.decoded = decoded;
        next();
    })
}
module.exports = verifyToken