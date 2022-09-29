import { Address } from '@/domain/@shared/value-objects/address'
import { Email } from '@/domain/@shared/value-objects/email'
import { Name } from '@/domain/@shared/value-objects/name'
import { Password } from '@/domain/@shared/value-objects/password'
import { User } from '@/domain/user/entities/user'
import { Customer } from '../customer'

describe('customer unit test', () => {
  it('should create customer', () => {
    const address = new Address('Street 1', '10B', '60999-111', 'city 1', 'state 1', 'country 1')
    
    const user = new User(new Name('Joao', 'da Silva'), new Email('joao@teste.com'), [address])
    user.changePassword(new Password('12345678'))

    const customer = new Customer(user)

    expect(customer).toBeDefined()
    expect(customer.user).toBeDefined()
    expect(customer.user.name.fullName).toBe('Joao da Silva')
    expect(customer.user.email.email).toBe('joao@teste.com')
    expect(customer.user.addresses).toMatchObject([address])
  })
})