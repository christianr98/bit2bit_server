const jwt = require('jsonwebtoken')

module.exports = function(req, res, next) {
    // Verify that token exists
    const token = req.header('auth-token')
    if (!token) return res.status(401).send('Acces Denied')
    // Verify that token is the correct one
    try {
        const verified = jwt.verify(token, process.env.TOKEN)
        req.user = verified
        next()
    } catch (err) {
        return res.status(401).send('Invalid Token')
    }
}