import { Address } from '@/domain/@shared/value-objects/address'
import { Email } from '@/domain/@shared/value-objects/email'
import { Name } from '@/domain/@shared/value-objects/name'
import { Password } from '@/domain/@shared/value-objects/password'
import { Customer } from '../customer'

describe('customer unit test', () => {
  it('should create customer', () => {
    const address = new Address('Street 1', '10B', '60999-111', 'city 1', 'state 1', 'country 1')
    const customer = new Customer(new Name('Joao', 'da Silva'), new Email('joao@teste.com'))
    customer.changeAddress(address)
    customer.changePassword(new Password('12345678'))

    expect(customer).toBeDefined()
    expect(customer.name.fullName).toBe('Joao da Silva')
    expect(customer.email.email).toBe('joao@teste.com')
    expect(customer.address).toMatchObject(address)
  })

  it('Should throw error when try to change address of customer to null', () => {
    expect(() => {
      const customer = new Customer(new Name('Joao', 'da Silva'), new Email('joao@teste.com'))
      customer.changeAddress(null)
    }).toThrowError('Address cannot be empty')
  })
})