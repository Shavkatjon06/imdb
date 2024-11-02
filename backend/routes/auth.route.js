import {Router} from 'express'
import bcrypt from 'bcrypt'
import valideasy from 'valideasy'
import generateToken from '../services/generate.token.js'
import MailService from '../services/mail.service.js'
import db from '../services/mysql.db.js'

const router = Router()
const mailService = new MailService()

router.post('/register', (req, res) => {
    const {email, password} = req.body
    const validationError = valideasy(req.body, ["email", "password"])
    if (validationError) {
        return res.json({ error: true, message: validationError })
    }
    const alreadyUser = "select * from users where email = ?"
    db.query(alreadyUser, [email], async (err, data) => {
        if (err) {
            return res.json({error: true, message: "Database error: " + err.message})
        }
        if (data.length > 0) {
            return res.json({error: true, message: "User already exists!"})
        }
        try {
            const hashedPassword = await bcrypt.hash(password, 10)
            const verificationCode = Math.floor(100000 + Math.random() * 900000)
            const insertUser = "insert into users (email, password, isVerified, verifCode) values(?, ?, ?, ?)"
            db.query(insertUser, [email, hashedPassword, false, verificationCode], async (err, data) => {
                if (err) {
                    return res.json({error: true, message: `Failed to register: ${err.message}`})
                }
                await mailService.sendVerificationCode(email, verificationCode)
                res.json({success: true, message: "Verification code is sent to you email."})
            })
        } catch (error) {
            res.json({error: true, message: error.message})
        }
    })
})


router.post('/verify', (req, res) => {
    const {email, verifCode} = req.body
    const findUser = "select * from users where email = ?"
    db.query(findUser, [email], (err,data) => {
        if (err) {
            return res.json({error: true, message: `Database error: ${err.message}`})
        }
        if (data.length == 0) {
            return res.json({error: true, message: "User not found"})
        }
        const user = data[0]
        if (Number(user.verifCode) !== Number(verifCode)) {
            return res.json({error: true, message: "Invalid verification code!"})
        }
        const updateUser = "update users set isVerified = ?, verifCode = ? where email = ?"
        db.query(updateUser, [true, null, email], (err) => {
            if (err) {
                return res.json({error: true, message: `Failed to verify: ${err.message}`})
            }
            const token = generateToken(user.email)
            res.json({success: true, imdb_token: token})
        })
    })
})

router.post('/login', (req, res) => {
    const {email, password} = req.body
    const validationError = valideasy(req.body, ["email", "password"])
    if (validationError) {
        return res.json({ error: true, message: validationError })
    }
    const alreadyUser = "select * from users where email = ?"
    db.query(alreadyUser, [email], async (err, data) => {
        if (err) {
            return res.json({error: true, message: "Database error: " + err.message})
        }
        if (data.length == 0) {
            return res.json({error: true, message: "User not found!"})
        }
        const user = data[0]
        if (!user.isVerified) {
            return res.json({error: true, message: "User is not verified!"})
        }
        const passwordValid = await bcrypt.compare(password, user.password)
        if (!passwordValid) {
            return res.json({error: true, message: "Password is incorrect!"})
        }
        const token = generateToken(user.email)
        res.json({success: true, imdb_token: token})
    })
})


export default router