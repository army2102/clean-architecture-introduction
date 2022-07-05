import { Collection, MongoClient } from 'mongodb'
import { ProfileEntity } from '../entities/profile-entity'

import { ProfileDbInterface } from '../usecases/profile-usecase'

type DbConfig = { uri: string; database: string; collection: string }

export class ProfileDbAdapter implements ProfileDbInterface {
  private dbCollection: Collection<ProfileEntity>
  private readonly dbConfig: DbConfig

  constructor(dbConfig: DbConfig) {
    this.dbConfig = dbConfig
  }

  public async connect(): Promise<void> {
    const { uri, database, collection } = this.dbConfig
    const connection = await new MongoClient(uri).connect()
    this.dbCollection = connection.db(database).collection(collection)
  }

  public async find(id: string): Promise<ProfileEntity> {
    const data = await this.dbCollection.findOne({ id })

    if (!data) {
      throw new Error(`Cannot find profile with id ${id}`)
    }

    return new ProfileEntity(data.id, data.name, data.surname, data.gender)
  }
}
