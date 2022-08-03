import { Address } from '@/domain/@shared/value-objects/address'
import { Email } from '@/domain/@shared/value-objects/email'
import { Name } from '@/domain/@shared/value-objects/name'

export class CustomerDTO {
  firstName: string
  lastName: string
  email: string
  address?: {
    street: string,
    number: string,
    zip_code: string,
    city: string,
    state: string,
    country: string
  }

  constructor(name: Name, email: Email, address?: Address) {
    this.firstName = name.firstName
    this.lastName = name.lastName
    this.email = email.email
    this.address = {
      street: address?.street || null,
      number: address?.number || null,
      zip_code: address?.zip_code || null,
      city: address?.city || null,
      state: address?.state || null,
      country: address?.country || null
    }
  }
}