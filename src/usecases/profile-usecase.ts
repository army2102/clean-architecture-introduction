import { ProfileEntity } from '../entities/profile-entity'

export interface ProfileDbInterface {
  find(id: string): Promise<ProfileEntity>
  create(profile: ProfileEntity): Promise<string>
  update(profile: ProfileEntity): Promise<void>
  delete(id: string): Promise<void>
}

export class ProfileUseCase {
  private readonly profileDb: ProfileDbInterface

  constructor(profileDb: ProfileDbInterface) {
    this.profileDb = profileDb
  }

  public async findProfile(id: string): Promise<ProfileEntity> {
    return await this.profileDb.find(id)
  }

  public async createProfile(input: {
    name: string
    surname: string
    gender: 'male' | 'female'
  }): Promise<string> {
    const profile = new ProfileEntity(input)

    const id = await this.profileDb.create(profile)

    return id
  }

  public async updateProfile(
    id: string,
    update: Partial<{
      name: string
      surname: string
      gender: 'male' | 'female'
    }>
  ): Promise<void> {
    const profile = await this.profileDb.find(id)

    for (const [field, value] of Object.entries(update)) {
      profile[field] = value
    }

    await this.profileDb.update(profile)
  }

  public async deleteProfile(id: string) {
    await this.profileDb.delete(id)
  }
}
