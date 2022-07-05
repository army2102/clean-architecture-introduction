import express from 'express'
import { config } from './config'

import { profileRoute } from './routes/profile-routes'

const app = express()

app.use('/profile', profileRoute)

app.listen(config.port, () => {
  console.log(`Example app listening on port ${config.port}`)
})
