import { Address } from '@/domain/@shared/value-objects/address'
import { User } from '@/domain/user/entities/user'

export class Customer extends User {
  private _address: Address

  get address() {
    return this._address
  }

  changeAddress(address: Address) {
    this._address = address
    this.validateAddress()
  }

  protected validateAddress() {
    if(!this._address)
      throw Error('Address cannot be empty')
  }
}