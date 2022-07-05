import { ProfileDbAdapter } from '../adapters/profileDb-adpater'
import { ProfileUseCase } from './profile-usecase'

jest.mock('../adapters/profileDb-adpater')

const dummyConfig = { uri: '', database: '', collection: '' }
const mockProfileDbAdapter = jest.mocked(new ProfileDbAdapter(dummyConfig))

describe('Test ProfileUseCase', () => {
  describe('Test findProfile', () => {
    it('Should return profile by calling find method once', async () => {
      const dummyId = ''
      const usecase = new ProfileUseCase(mockProfileDbAdapter)

      await usecase.findProfile(dummyId)

      expect(mockProfileDbAdapter.find).toBeCalledWith(dummyId)
    })
  })
})
