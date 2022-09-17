import { Address } from '@/domain/@shared/value-objects/address'
import { Email } from '@/domain/@shared/value-objects/email'
import { Name } from '@/domain/@shared/value-objects/name'
import { Password } from '@/domain/@shared/value-objects/password'
import { CustomerFactory } from '../customer.factory'

describe('Customer factory unit test', () => {
  it('should create a customer without address', () => {
    const customerFactory = new CustomerFactory()
    const customer = customerFactory.create(
      new Name('Joao', 'Silva'), 
      new Email('joao@teste.com'), 
      new Password('12345678'),
    )

    expect(customer).toBeDefined()
    expect(customer.name.fullName).toBe('Joao Silva')
    expect(customer.name.firstName).toBe('Joao')
    expect(customer.name.lastName).toBe('Silva')
    expect(customer.email.email).toBe('joao@teste.com')
    expect(customer.address).toBeUndefined()
  })

  it('should create a customer with address', () => {
    const customerFactory = new CustomerFactory()
    const address = new Address('Street 1', '10', '60999-666', 'city 1', 'state 1', 'country 1')
    const customer = customerFactory.createWithAddress(
      new Name('Joao', 'Silva'), 
      new Email('joao@teste.com'), 
      new Password('12345678'),
      address)

    expect(customer).toBeDefined()
    expect(customer.name.fullName).toBe('Joao Silva')
    expect(customer.name.firstName).toBe('Joao')
    expect(customer.name.lastName).toBe('Silva')
    expect(customer.email.email).toBe('joao@teste.com')
    expect(customer.address).toBeDefined()
    expect(customer.address.street).toBe('Street 1')
    expect(customer.address.number).toBe('10')
    expect(customer.address.zip_code).toBe('60999-666')
    expect(customer.address.city).toBe('city 1')
    expect(customer.address.state).toBe('state 1')
    expect(customer.address.country).toBe('country 1')
  })
})