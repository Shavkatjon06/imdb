import jwt from 'jsonwebtoken'

const generateToken = userEmail => {
    const token = jwt.sign({userEmail}, process.env.TOKEN, {expiresIn: '7d',algorithm: 'HS256',issuer: 'Shavkatjon | IMDB Project'})
    return token
}

export default generateToken