import { ProfileEntity } from '../entities/profile-entity'

export interface ProfileDbInterface {
  find(id: string): Promise<ProfileEntity>
}

export class ProfileUseCase {
  private readonly profileDb: ProfileDbInterface

  constructor(profileDb: ProfileDbInterface) {
    this.profileDb = profileDb
  }

  public async findProfile(id: string): Promise<ProfileEntity> {
    return await this.profileDb.find(id)
  }
}
