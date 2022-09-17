import { CustomerDTO } from '@/application/customer/dto/customer.dto'
import { Address } from '@/domain/@shared/value-objects/address'
import { Email } from '@/domain/@shared/value-objects/email'
import { Name } from '@/domain/@shared/value-objects/name'

describe('Customer DTO unit test', () => {
  it('Should create customer dto', () => {
    const address = new Address('street 1', '10', '60999-888', 'city 1', 'state 1', 'country 1')
    const customerDto = new CustomerDTO(new Name('Joao', 'da Silva'), new Email('joao@teste.com'), address)

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
    const customerDto = new CustomerDTO(new Name('Joao', 'da Silva'), new Email('joao@teste.com'), null)

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