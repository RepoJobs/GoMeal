import dotenv from 'dotenv'

import { InputError } from '@/domain/@shared/errors/input.error'
import { InvalidPasswordHash } from '../errors/invalid-password-hash.error'
import { PasswordManager } from '@/infra/auth/password/password.manager'

dotenv.config()

export class Password {
  private _password: string
  private _passwordManager = new PasswordManager()

  constructor(password: string, encrypt: boolean = true) {
    if(encrypt) {
      this.validate(password)

      const salt = this._passwordManager.salt()
      this._password = this._passwordManager.encode(password, salt)
      return
    }

    if(!this._passwordManager.isValidHash(password))
      throw new InvalidPasswordHash('Cannot parse the password. Invalid Hash. Probably it\'s not encrypted.')

    this._password = password
  }

  get hash() {
    return this._password
  }

  private validate(password: string) {
    if(!password || password.length == 0)
      throw new InputError('Password cannot be empty')

    if(password.length < 8)
      throw new InputError('Password must have least 8 characters')
  }
}