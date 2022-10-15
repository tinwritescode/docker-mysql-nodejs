import { BaseResponseBody } from './base/types/baseResponse'
import express, { Response } from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import morgan from 'morgan'
import swaggerUi from 'swagger-ui-express'
import actorRoute from './route/actor.route'
import path from 'path'
const swaggerJson = require('../swagger.json')

dotenv.config()

const app = express()
app.use(cors())
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(morgan('dev'))

app.get('/', (_, res) => {
  res.sendFile('index.html', { root: path.join(__dirname, 'public') })
})
app.use('/actors', actorRoute)
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerJson))

app.use((_, res: Response<BaseResponseBody>) => {
  res.status(404).json({ ok: false, message: 'Not Found', data: null })
})

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port http://localhost:${process.env.PORT}`)
})
