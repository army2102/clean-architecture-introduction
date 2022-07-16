import Container from 'typedi'

import { ProfileDbAdapter } from '../adapters/profileDb-adapter'
import { ProfileUseCase } from '../usecases/profile-usecase'
import { config } from './config'

export const initContainer = async (): Promise<void> => {
  const profileDbAdapter = new ProfileDbAdapter(config.dbConfig)
  await profileDbAdapter.connect()

  Container.set('ProfileDbAdapter', profileDbAdapter)
  Container.set('ProfileUseCase', ProfileUseCase)
}
