import { User } from '@/domain/user/entities/user'

export class Customer {
  private _user: User

  constructor(user: User) {
    this._user = user
  }

  get user(): User {
    return this._user
  }
}