import express from 'express'
import bodyParser from 'body-parser'

import { profileRoute } from './routes/profile-routes'

export const createServer = () => {
  const app = express()

  app.use(bodyParser.urlencoded({ extended: false }))
  app.use(bodyParser.json())
  app.use('/profile', profileRoute)

  return app
}
