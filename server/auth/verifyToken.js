const jwt = require("jsonwebtoken");

const verifyToken = async (req, res) => {
    const token = req.body.token || req.query.token || req.headers['x-access-token']
    if (token) {
        const decoded = await jwt.verify(token, 'test123')
        res.json({success:true, data:decoded})
    }
    else{
        res.json({success:false, msg:"No authenticate token!"})
    }
}

module.exports = verifyToken