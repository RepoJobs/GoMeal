import { IService } from '@/application/@shared/IService'
import { ICustomerRepository } from '@/domain/customer/repository/customer.repository.interface'
import { CustomerDTO } from '../dto/customer.dto'
import { Address } from '@/domain/@shared/value-objects/address'
import { Name } from '@/domain/@shared/value-objects/name'
import { Email } from '@/domain/@shared/value-objects/email'
import { Password } from '@/domain/@shared/value-objects/password'
import { IUserRepository } from '@/domain/user/repository/user.repository.interface'
import { User } from '@/domain/user/entities/user'
import { Customer } from '@/domain/customer/entities/customer'

export interface ICustomerRegisterData {
  firstName: string,
  lastName: string,
  email: string,
  password: string,
  address?: {
    street: string,
    number: string,
    zip_code: string,
    city: string,
    state: string,
    country: string
  }
}

export class CustomerRegisterService implements IService {
  private _customerRepository: ICustomerRepository
  private _userRepository: IUserRepository

  constructor(customerRepository: ICustomerRepository, userRepository: IUserRepository) {
    this._customerRepository = customerRepository
    this._userRepository = userRepository
  }

  async execute(data: ICustomerRegisterData): Promise<CustomerDTO> {
    const { firstName, lastName, email, password, address } = data

    // address
    const userAddresses = []
    let customerAddress
    if(address) {
      const { street, number, zip_code, city, state, country } = address
      customerAddress = new Address(street, number, zip_code, city, state, country)
      userAddresses.push(customerAddress)
    }

    // user
    const encryptedPassword = new Password(password)
    const user = new User(new Name(firstName, lastName), new Email(email), userAddresses)
    user.changePassword(encryptedPassword)

    const userID = await this._userRepository.create(user)
    user.changeID(userID)
    
    const customer = new Customer(user)
    await Promise.allSettled([
      await this._userRepository.addAddress(userID, customerAddress),
      await this._customerRepository.create(customer)
    ])

    const customerDto = new CustomerDTO(user.name, user.email, user.addresses)
    return customerDto
  }
}