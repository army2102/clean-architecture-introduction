import express from 'express'
import Container from 'typedi'

import { ProfileUseCase } from '../../usecases/profile-usecase'

export const profileRoute = express.Router()

export const getProfileController = async (req, res) => {
  const { id } = req.params

  const profileUseCase = Container.get(ProfileUseCase)
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

export const createProfileContoller = async (req, res) => {
  const { name, surname, gender } = req.body

  const profileUseCase = Container.get(ProfileUseCase)
  const profileId = await profileUseCase.createProfile({
    name,
    surname,
    gender
  })

  res.json({
    data: { id: profileId }
  })
}

export const updateProfileController = async (req, res) => {
  const { id, name, surname, gender } = req.body

  const profileUseCase = Container.get(ProfileUseCase)
  await profileUseCase.updateProfile(id, {
    name,
    surname,
    gender
  })

  res.json({})
}

export const deleteProfileController = async (req, res) => {
  const { id } = req.body

  const profileUseCase = Container.get(ProfileUseCase)
  await profileUseCase.deleteProfile(id)

  res.json({})
}

profileRoute.get('/:id', getProfileController)
profileRoute.post('/', createProfileContoller)
profileRoute.patch('/', updateProfileController)
profileRoute.delete('/', deleteProfileController)
