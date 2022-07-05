export class ProfileEntity {
  public id: string
  public name: string
  public surname: string
  public gender: string

  constructor(id: string, name: string, surname: string, gender: string) {
    this.id = id
    this.name = name
    this.surname = surname
    this.gender = gender
  }
}
