export class Name {
  private _firstName: string
  private _lastName: string

  constructor(firstName: string, lastName: string = null) {
    this._firstName = firstName
    this._lastName = lastName
    this.validate()
  }

  get firstName() {
    return this._firstName
  }

  get lastName() {
    return this._lastName
  }

  get fullName() {
    const namesWithValues = [this.firstName, this.lastName].filter(name => !!name)
    return namesWithValues.join(' ')
  }

  private validate() {
    if(!this.firstName || this.firstName.length == 0)
      throw Error('The first name cannot be empty')
  }
}