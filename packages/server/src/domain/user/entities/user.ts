import { Address } from '@/domain/@shared/value-objects/address'
import { Email } from '@/domain/@shared/value-objects/email'
import { Name } from '@/domain/@shared/value-objects/name'
import { Password } from '@/domain/@shared/value-objects/password'

export class User {
  private _id: number
  private _name: Name
  private _email: Email
  private _password: Password
  private _addresses: Address[]

  constructor(name: Name, email: Email, addresses: Address[]) {
    this._name = name
    this._email = email
    this._addresses = addresses

    this.validate()
  }

  get id() {
    return this._id
  }

  get name() {
    return this._name
  }

  get email() {
    return this._email
  }

  get addresses() {
    return this._addresses
  }

  get passwordHash() {
    return this._password.hash
  }

  changeName(name: Name) {
    this._name = name
    this.validate()
  }

  changePassword(password: Password) {
    this._password = password
    this.validatePassword()
  }

  changeID(id: number) {
    this._id = id
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