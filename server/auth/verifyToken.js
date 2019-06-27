import jwt from 'jsonwebtoken'

const verifyToken = async (req, res) => {
    const token = req.body.token || req.query.token || req.headers['x-access-token']
    if (token) {
        try {
            const decoded = await jwt.verify(token, 'test123')
            res.json({success:true, data:decoded})
        } catch {
            res.json({success:false, msg:"Failed to authenticate token"})
        }
    }
    else{
        res.json({success:false, msg:"No authenticate token!"})
    }
}

export default verifyToken