import express from 'express'
import dotenv from 'dotenv'
import swaggerUi from 'swagger-ui-express'
import actorRoute from './app/routes/actor.route'
const swaggerJson = require('./app/lib/swagger.json')

dotenv.config()

const app = express()

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.use('/actors', actorRoute)

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerJson))

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port http://localhost:${process.env.PORT}`)
})
