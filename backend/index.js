import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import AuthRoute from './routes/auth.route.js'
import MoviesRoute from './routes/movies.route.js'

const app = express()

app.use(express.json())
app.use(cors({origin: "*"}))
dotenv.config()

app.use(AuthRoute)
app.use(MoviesRoute)

app.listen(5000)