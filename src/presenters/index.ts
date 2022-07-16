import 'reflect-metadata'

import { config } from './config'
import { initContainer } from './di'
import { createServer } from './server'

const initApp = async () => {
  await initContainer()

  const server = createServer()

  server.listen(config.port, () => {
    console.log(`Example app listening on port ${config.port}`)
  })
}

initApp()
