import dotenv from 'dotenv'
dotenv.config()
import { BaseResponse } from './base/types/baseResponse'
import { specs } from './middleware/swagger.middleware'
import express from 'express'
import cors from 'cors'
import morgan from 'morgan'
import swaggerUi from 'swagger-ui-express'
import actorRoute from './route/actor.route'
import path from 'path'

const app = express()
app.use(cors())
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(morgan('dev'))

app.get('/', (_, res) => {
  res.sendFile('index.html', { root: path.join(__dirname, 'public') })
})
app.use('/actors', actorRoute)
app.use(
  '/api-docs',
  swaggerUi.serve,
  swaggerUi.setup(specs, { explorer: true }),
)
app.use((_, res: BaseResponse) => {
  res.status(404).json({ ok: false, message: 'Not Found', data: null })
})

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port http://localhost:${process.env.PORT}`)
})
