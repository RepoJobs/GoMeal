export class Password {
  private _password: string

  constructor(password: string) {
    this._password = password
    this.validate()
  }

  private validate() {
    if(!this._password || this._password.length == 0)
      throw new Error('Password cannot be empty')

    if(this._password.length < 8)
      throw new Error('Password must have least 8 characters')
  }
}