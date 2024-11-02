import jwt from 'jsonwebtoken'

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if (!token) {
        return res.json({error: true, message: "Token not provided!"})
    }
    jwt.verify(token, process.env.TOKEN, (error, user) => {
        if (error) {
            return res.json({error: true, message: error.message})
        }
        req.user = user
        next()
    })
}

export default authenticateToken