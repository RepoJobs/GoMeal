import { InputError } from '@/domain/@shared/exceptions/input.error'

export class Password {
  private _password: string

  constructor(password: string) {
    this._password = password
    this.validate()
  }

  private validate() {
    if(!this._password || this._password.length == 0)
      throw new InputError('Password cannot be empty')

    if(this._password.length < 8)
      throw new InputError('Password must have least 8 characters')
  }
}