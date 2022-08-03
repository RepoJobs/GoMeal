import { Address } from '@/domain/@shared/value-objects/address'
import { Email } from '@/domain/@shared/value-objects/email'
import { Name } from '@/domain/@shared/value-objects/name'
import { Password } from '@/domain/@shared/value-objects/password'
import { Customer } from '../entities/customer'

export class CustomerFactory {
  create(firstName: string, lastName: string, email: string, password: string): Customer {
    const customer = new Customer(
      new Name(firstName, lastName),
      new Email(email)
    )
    customer.changePassword(new Password(password))
    return customer
  }

  createWithAddress(
    firstName: string, lastName: string, email: string, password: string,
    street: string, number: string, zip_code: string, city: string,
    state: string, country: string
  ): Customer {
    const customer = this.create(firstName, lastName, email, password)
    const address = new Address(street, number, zip_code, city, state, country)
    customer.changeAddress(address)
    return customer
  }
}