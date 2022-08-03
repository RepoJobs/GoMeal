import { CustomerDTO } from '@/application/customer/dto/customer.dto'
import { CustomerFactory } from '@/domain/customer/factory/customer.factory'

describe('Customer DTO unit test', () => {
  it('Should create customer dto', () => {
    const customerFactory = new CustomerFactory()
    const customer = customerFactory.createWithAddress(
      'Joao', 'da Silva', 'joao@teste.com', '12345678',
      'street 1', '10', '60999-888', 'city 1', 'state 1', 'country 1'
    )

    const customerDto = new CustomerDTO(customer.name, customer.email, customer.address)
    expect(customerDto).toBeDefined()
    expect(customerDto.firstName).toBe('Joao')
    expect(customerDto.lastName).toBe('da Silva')
    expect(customerDto.email).toBe('joao@teste.com')
    expect(customerDto.address).toMatchObject({
      street: 'street 1',
      number: '10',
      zip_code: '60999-888',
      city: 'city 1',
      state: 'state 1',
      country: 'country 1'
    })
  })

  it('Should create customer dto with null address', () => {
    const customerFactory = new CustomerFactory()
    const customer = customerFactory.create(
      'Joao', 'da Silva', 'joao@teste.com', '12345678')

    const customerDto = new CustomerDTO(customer.name, customer.email, customer.address)
    expect(customerDto).toBeDefined()
    expect(customerDto.firstName).toBe('Joao')
    expect(customerDto.lastName).toBe('da Silva')
    expect(customerDto.email).toBe('joao@teste.com')
    expect(customerDto.address).toMatchObject({
      street: null,
      number: null,
      zip_code: null,
      city: null,
      state: null,
      country: null
    })
  })
})