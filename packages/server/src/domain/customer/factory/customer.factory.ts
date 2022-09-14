import { Address } from '@/domain/@shared/value-objects/address'
import { Email } from '@/domain/@shared/value-objects/email'
import { Name } from '@/domain/@shared/value-objects/name'
import { Password } from '@/domain/@shared/value-objects/password'
import { Customer } from '../entities/customer'

export class CustomerFactory {
  create(name: Name, email: Email, password: Password): Customer {
    const customer = new Customer(name, email)
    customer.changePassword(password)
    return customer
  }

  createWithAddress(
    name: Name, email: Email, password: Password, address: Address
  ): Customer {
    const customer = this.create(name, email, password)
    customer.changeAddress(address)
    return customer
  }
}