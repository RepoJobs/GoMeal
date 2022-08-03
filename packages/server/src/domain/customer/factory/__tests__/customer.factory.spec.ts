import { CustomerFactory } from '../customer.factory'

describe('Customer factory unit test', () => {
  it('should create a customer without address', () => {
    const customerFactory = new CustomerFactory()
    const customer = customerFactory.create('Joao', 'Silva', 'joao@teste.com', '12345678')

    expect(customer).toBeDefined()
    expect(customer.name.fullName).toBe('Joao Silva')
    expect(customer.name.firstName).toBe('Joao')
    expect(customer.name.lastName).toBe('Silva')
    expect(customer.email.email).toBe('joao@teste.com')
    expect(customer.address).toBeUndefined()
  })

  it('should create a customer with address', () => {
    const customerFactory = new CustomerFactory()
    const customer = customerFactory.createWithAddress('Joao', 'Silva', 'joao@teste.com', '12345678', 'Street 1', '10', '60999-666', 'city 1', 'state 1', 'country 1')

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