export class ProfileEntity {
  private _id: string
  private _name: string
  private _surname: string
  private _gender: string

  constructor(input: {
    id?: string
    name: string
    surname: string
    gender: string
  }) {
    const { id, name, surname, gender } = input
    this._id = id
    this._name = name
    this._surname = surname
    this._gender = gender
  }

  public get id(): string {
    return this._id
  }
  public set id(value: string) {
    if (this._id) throw new Error('This profile already has an id')
    this._id = value
  }

  public get name(): string {
    return this._name
  }
  public set name(value: string) {
    this._name = value
  }

  public get surname(): string {
    return this._surname
  }
  public set surname(value: string) {
    this._surname = value
  }

  public get gender(): string {
    return this._gender
  }
  public set gender(value: string) {
    this._gender = value
  }
}
