import express from 'express'

import { ProfileDbAdapter } from '@/adapters/profileDb-adpater'
import { ProfileUseCase } from '@/usecases/profile-usecase'
import { config } from '../config'

export const profileRoute = express.Router()

// define the home page route
export const getProfileController = async (req, res) => {
  const { id } = req.body

  const profileDbAdapter = new ProfileDbAdapter(config.dbConfig)
  await profileDbAdapter.connect()
  const profileUseCase = new ProfileUseCase(profileDbAdapter)
  const profile = await profileUseCase.findProfile(id)

  res.json({
    data: {
      id: profile.id,
      name: profile.name,
      surname: profile.surname,
      gender: profile.gender
    }
  })
}

profileRoute.get('/', getProfileController)
