import express from 'express'

import { ProfileDbAdapter } from '@/adapters/profileDb-adpater'
import { ProfileUseCase } from '@/usecases/profile-usecase'
import { profileRoute } from './routes/profile-routes'
;(async () => {
  const app = express()
  const port = 3000

  // Init dependencies

  // Init API
  app.use('/profile', profileRoute)

  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })
})()
