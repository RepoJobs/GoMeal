import { InputError } from '@/domain/@shared/errors/input.error'

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
      throw new InputError('Email cannot be empty')

    if(!regex.test(this.email))
      throw new InputError(`Email "${this.email}" is invalid.`)
  }
}