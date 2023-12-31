const jwt = require('jsonwebtoken')

const verifyToken = (req: any, res: any, next: any) => {
    const token = req.body.token || req.query.token || req.headers['x-access-token']

    if (!token) {
        return res.status(403).send('A token is required for authentication')
    }
    try {
        req.user = jwt.verify(token, process.env.JWT_SECRET)
    } catch (err) {
        return res.status(401).send('Invalid Token')
    }
    return next()
}

module.exports = verifyToken
