import { Email } from '@/domain/@shared/value-objects/email'
import { Name } from '@/domain/@shared/value-objects/name'
import { Password } from '@/domain/@shared/value-objects/password'

export abstract class User {
  private _name: Name
  private _email: Email
  private _password: Password

  constructor(name: Name, email: Email) {
    this._name = name
    this._email = email

    this.validate()
  }

  get name() {
    return this._name
  }

  get email() {
    return this._email
  }

  changeName(name: Name) {
    this._name = name
    this.validate()
  }

  changePassword(password: Password) {
    this._password = password
    this.validatePassword()
  }

  protected validate() {
    if(!this.name)
      throw Error('Name cannot be empty')

    if(!this.email)
      throw Error('Email cannot be empty')
  }

  protected validatePassword() {
    if(!this._password)
      throw Error('Cannot change password to empty')
  }
}