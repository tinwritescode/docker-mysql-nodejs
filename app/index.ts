import passport from './middleware/passport.middleware'
import { errorConverter, errorHandler } from './middleware/error.middleware'
import dotenv from 'dotenv'
dotenv.config()
import { specs } from './middleware/swagger.middleware'
import express, { NextFunction } from 'express'
import cors from 'cors'
import morgan from 'morgan'
import swaggerUi from 'swagger-ui-express'
import authRoute from './route/auth.route'
import path from 'path'
import httpStatus from 'http-status'
import ApiError from './base/utils/apiError'
import session from 'express-session'

const app = express()
app.use(cors())
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(morgan('dev'))
app.use(
  session({
    secret: process.env.SESSION_SECRET as string,
    resave: false,
    saveUninitialized: true,
  }),
)

app.use(passport.initialize())

app.get('/', (_, res) => {
  res.sendFile('index.html', { root: path.join(__dirname, 'public') })
})
app.use('/auth', authRoute)
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs))

app.use((_req, _res, next: NextFunction) => {
  next(new ApiError(httpStatus.NOT_FOUND, 'Not found'))
})
app.use(errorConverter)
app.use(errorHandler)

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port http://localhost:${process.env.PORT}`)
})
