import { Inject, Service } from 'typedi'
import { Collection, MongoClient, ObjectId } from 'mongodb'

import { ProfileEntity } from '../entities/profile-entity'
import { ProfileDbInterface } from '../usecases/profile-usecase'

type DbConfig = { uri: string; database: string; collection: string }

@Service()
export class ProfileDbAdapter implements ProfileDbInterface {
  private dbCollection: Collection<Omit<ProfileEntity, 'id'>>
  private readonly dbConfig: DbConfig

  constructor(@Inject('DbConfig') dbConfig: DbConfig) {
    this.dbConfig = dbConfig
  }

  public async connect(): Promise<void> {
    const { uri, database, collection } = this.dbConfig
    const connection = await new MongoClient(uri).connect()
    this.dbCollection = connection.db(database).collection(collection)
  }

  public async find(id: string): Promise<ProfileEntity> {
    const data = await this.dbCollection.findOne({ _id: new ObjectId(id) })

    if (!data) {
      throw new Error(`Cannot find profile with id ${id}`)
    }

    const { _id, name, surname, gender } = data
    return new ProfileEntity({ id: _id.toHexString(), name, surname, gender })
  }

  public async create(profile: ProfileEntity): Promise<string> {
    const { name, surname, gender } = profile

    const result = await this.dbCollection.insertOne({
      name,
      surname,
      gender
    })

    return result.insertedId.toHexString()
  }

  public async update(profile: ProfileEntity): Promise<void> {
    const { id, name, surname, gender } = profile

    await this.dbCollection.updateOne(
      { _id: new ObjectId(id) },
      {
        $set: {
          name,
          surname,
          gender
        }
      }
    )
  }

  public async delete(id: string): Promise<void> {
    await this.dbCollection.deleteOne({ _id: new ObjectId(id) })
  }
}
