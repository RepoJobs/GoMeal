/* eslint-disable @typescript-eslint/no-unused-vars */
import { Email } from '@/domain/@shared/value-objects/email'
import { Name } from '@/domain/@shared/value-objects/name'
import { Password } from '@/domain/@shared/value-objects/password'
import { UserTest } from './fixture/user_test'

describe('user unit test', () => {
  it('Should create user', () => {
    const user = new UserTest(new Name('João', 'da Silva'), new Email('joao@teste.com'))
    user.changePassword(new Password('12345678'))
    expect(user).toBeDefined()
    expect(user.name.fullName).toBe('João da Silva')
    expect(user.email.email).toBe('joao@teste.com')
  })

  it('Should throw error when try to create user with name as null', () => {
    expect(() => {
      const user = new UserTest(null, new Email('joao@teste.com'))
    }).toThrowError('Name cannot be empty')
  })

  it('Should throw error when try to change user name to null', () => {
    expect(() => {
      const user = new UserTest(new Name('João', 'da Silva'), new Email('joao@teste.com'))
      user.changeName(null)
    }).toThrowError('Name cannot be empty')
  })

  it('Should throw error when try to create user with email as null', () => {
    expect(() => {
      const user = new UserTest(new Name('João', 'da Silva'), null)
    }).toThrowError('Email cannot be empty')
  })

  it('Should throw error when try to change user password to null', () => {
    expect(() => {
      const user = new UserTest(new Name('João', 'da Silva'), new Email('joao@teste.com'))
      user.changePassword(null)
    }).toThrowError('Cannot change password to empty')
  })
})