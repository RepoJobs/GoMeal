import { CustomerRegisterService, ICustomerRegisterData } from '@/application/customer/services/customer.register.service'
import { CustomerRepositoryPrisma } from '../../../../infra/repository/customer/customer.repository.prisma'
import { UserRepositoryPrisma } from '@/infra/repository/user/user.repository.prisma'
import { Prisma } from '@/infra/db/prisma/client'
import { generateLocalization } from '@tests/helpers/utils'

beforeEach(async () => {
  const prisma = new Prisma()
  await prisma.clearAllTables()
  prisma.disconnect()
})

describe('Customer register application service unit test', () => {
  it('Should create customer with address and valid informations', async () => {
    const customerRegisterService = new CustomerRegisterService(
      new CustomerRepositoryPrisma(),
      new UserRepositoryPrisma())

    await generateLocalization('country 1', 'state 1', 'city 1')

    const data: ICustomerRegisterData = {
      firstName: 'Joao',
      lastName: 'da Silva',
      email: 'joao@teste.com',
      password: '12345678',
      address: {
        city: 'city 1',
        country: 'country 1',
        number: '10',
        state: 'state 1',
        street: 'street 1',
        zip_code: '60999-888'
      }
    }

    const customerDTO = await customerRegisterService.execute(data)

    expect(customerDTO.firstName).toBe('Joao')
    expect(customerDTO.lastName).toBe('da Silva')
    expect(customerDTO.email).toBe('joao@teste.com')
    expect(customerDTO.addresses).toMatchObject([{
      city: 'city 1',
      country: 'country 1',
      number: '10',
      state: 'state 1',
      street: 'street 1',
      zip_code: '60999-888'
    }])
  })

  it('Should create customer without address', async () => {
    const customerRegisterService = new CustomerRegisterService(
      new CustomerRepositoryPrisma(),
      new UserRepositoryPrisma())

    const data: ICustomerRegisterData = {
      firstName: 'Joao',
      lastName: 'da Silva',
      email: 'joao@teste.com',
      password: '12345678',
      address: null
    }

    const customerDTO = await customerRegisterService.execute(data)

    expect(customerDTO.firstName).toBe('Joao')
    expect(customerDTO.lastName).toBe('da Silva')
    expect(customerDTO.email).toBe('joao@teste.com')
    expect(customerDTO.addresses).toStrictEqual([])
  })

  it('Should throw error when try to create customer with invalid email', async () => {
    await expect(async () => {
      const customerRegisterService = new CustomerRegisterService(
        new CustomerRepositoryPrisma(),
        new UserRepositoryPrisma())

      await generateLocalization('country 1', 'state 1', 'city 1')

      const data: ICustomerRegisterData = {
        firstName: 'Joao',
        lastName: 'da Silva',
        email: 'joao123.com',
        password: '12345678',
        address: {
          city: 'city 1',
          country: 'country 1',
          number: '10',
          state: 'state 1',
          street: 'street 1',
          zip_code: '60999-888'
        }
      }

      await customerRegisterService.execute(data)
    }).rejects.toThrowError('Invalid email: joao123.com')
  })

  it('Should throw error when try to create customer with invalid password', async () => {
    await expect(async () => {
      const customerRegisterService = new CustomerRegisterService(
        new CustomerRepositoryPrisma(),
        new UserRepositoryPrisma())

      await generateLocalization('country 1', 'state 1', 'city 1')

      const data: ICustomerRegisterData = {
        firstName: 'Joao',
        lastName: 'da Silva',
        email: 'joao@gmail.com',
        password: '123',
        address: {
          city: 'city 1',
          country: 'country 1',
          number: '10',
          state: 'state 1',
          street: 'street 1',
          zip_code: '60999-888'
        }
      }

      await customerRegisterService.execute(data)
    }).rejects.toThrowError('Password must have least 8 characters')
  })

  it('Should throw error when try to create customer with empty first name', async () => {
    await expect(async () => {
      const customerRegisterService = new CustomerRegisterService(
        new CustomerRepositoryPrisma(),
        new UserRepositoryPrisma())

      await generateLocalization('country 1', 'state 1', 'city 1')

      const data: ICustomerRegisterData = {
        firstName: '',
        lastName: 'da Silva',
        email: 'joao@gmail.com',
        password: '12345678',
        address: {
          city: 'city 1',
          country: 'country 1',
          number: '10',
          state: 'state 1',
          street: 'street 1',
          zip_code: '60999-888'
        }
      }

      await customerRegisterService.execute(data)
    }).rejects.toThrowError('First name is required')
  })
})