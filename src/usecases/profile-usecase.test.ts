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

  describe('Test createProfile', () => {
    it('Should return profile id', async () => {
      const expected = ''
      mockProfileDbAdapter.create.mockResolvedValue(expected)
      const usecase = new ProfileUseCase(mockProfileDbAdapter)

      const actual = await usecase.createProfile({
        name: 'nae',
        surname: '3x',
        gender: 'male'
      })

      // TODO: Check if we should assert like this
      expect(mockProfileDbAdapter.create).toBeCalledWith({
        _id: undefined,
        _name: 'nae',
        _surname: '3x',
        _gender: 'male'
      })
      expect(actual).toEqual(expected)
    })
  })
})
