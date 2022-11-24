import { Address } from '@/domain/@shared/value-objects/address'
import { Email } from '@/domain/@shared/value-objects/email'
import { Name } from '@/domain/@shared/value-objects/name'

export class CustomerDTO {
  firstName: string
  lastName: string
  email: string
  addresses?: {
    street: string,
    number: string,
    zip_code: string,
    city: string,
    state: string,
    country: string
  }[]

  constructor(name: Name, email: Email, addresses?: Address[]) {
    this.firstName = name.firstName
    this.lastName = name.lastName
    this.email = email.email
    this.addresses = addresses?.filter(address => !!address).map(address => ({
      street: address.street,
      number: address.number,
      zip_code: address.zip_code,
      city: address.city,
      state: address.state,
      country: address.country
    })) || []
  }
}