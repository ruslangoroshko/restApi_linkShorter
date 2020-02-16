const jwt = require('jsonwebtoken')
const config = require('config')

module.exports = (req, res, next) => {
    if (req.method === 'OPTIONS' ) {
        return next() 
    }

    try {
        
        const token = req.headers.authorization.split(' ')[1] // Bearer TOKEN
        if (!token) {
            return res.status(401).json({message: "User token error"})
        }
        const decoded = jwt.verify(token, config.get('jwtKey'))
        req.user = decoded

        next()
        
    } catch (e) {
        return res.status(401).json({message: "User not authorization"})
    }
}