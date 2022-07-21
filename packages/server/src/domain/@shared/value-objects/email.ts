export class Email {
  private _email: string

  constructor(email: string) {
    this._email = email
    this.validate()
  }

  get email() {
    return this._email
  }

  private validate() {
    const regex = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i

    if(!this.email || this.email.length == 0)
      throw Error('Email cannot be empty')

    if(!regex.test(this.email))
      throw Error(`Email "${this.email}" is invalid.`)
  }
}