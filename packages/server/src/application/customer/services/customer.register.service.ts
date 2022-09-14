import { IService } from '@/application/@shared/IService'
import { ICustomerRepository } from '@/domain/customer/repository/customer.repository.interface'
import { CustomerFactory } from '@/domain/customer/factory/customer.factory'
import { CustomerDTO } from '../dto/customer.dto'
import { Address } from '@/domain/@shared/value-objects/address'
import { Name } from '@/domain/@shared/value-objects/name'
import { Email } from '@/domain/@shared/value-objects/email'
import { Password } from '@/domain/@shared/value-objects/password'

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
  private _customerFactory: CustomerFactory

  constructor(customerRepository: ICustomerRepository) {
    this._customerRepository = customerRepository
    this._customerFactory = new CustomerFactory()
  }

  async execute(data: ICustomerRegisterData): Promise<CustomerDTO> {
    const { address } = data

    if(!address)
      return await this.create(data)

    return await this.createWithAddress(data)
  }

  async create(data: ICustomerRegisterData): Promise<CustomerDTO> {
    const { firstName, lastName, email, password } = data
    
    const customer = this._customerFactory.create(
      new Name(firstName, lastName), 
      new Email(email), 
      new Password(password))

    await this._customerRepository.register(customer)

    const customerDto = new CustomerDTO(customer.name, customer.email, customer.address)
    return customerDto
  }

  async createWithAddress(data: ICustomerRegisterData): Promise<CustomerDTO> {
    const { firstName, lastName, email, password, address } = data
    const { street, number, zip_code, city, state, country } = address

    const customerAddress = new Address(street, number, zip_code, city, state, country)
    const customer = this._customerFactory.createWithAddress(
      new Name(firstName, lastName), 
      new Email(email), 
      new Password(password), 
      customerAddress)

    await this._customerRepository.register(customer)

    const customerDto = new CustomerDTO(customer.name, customer.email, customer.address)
    return customerDto
  }
}