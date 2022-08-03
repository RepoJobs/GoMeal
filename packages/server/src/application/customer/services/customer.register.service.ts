import { IService } from '@/application/@shared/IService'
import { ICustomerRepository } from '@/domain/customer/repository/customer.repository.interface'
import { CustomerFactory } from '@/domain/customer/factory/customer.factory'
import { CustomerDTO } from '../dto/customer.dto'

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

  constructor(customerRepository: ICustomerRepository) {
    this._customerRepository = customerRepository
  }

  async execute(data: ICustomerRegisterData): Promise<CustomerDTO> {
    const { firstName, lastName, email, password, address } = data
    const { street, number, zip_code, city, state, country } = address

    const customerFactory = new CustomerFactory()
    const customer = customerFactory.createWithAddress(
      firstName, lastName, email, password,
      street, number, zip_code, city, state, country)

    await this._customerRepository.register(customer)

    const customerDto = new CustomerDTO(customer.name, customer.email, customer.address)
    return customerDto
  }
}