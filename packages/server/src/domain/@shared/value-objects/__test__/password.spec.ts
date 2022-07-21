/* eslint-disable @typescript-eslint/no-unused-vars */
import { Password } from '../password'

describe('Password value object unit test', () => {
  it('Should create password', () => {
    const password = new Password('12345678')
    expect(password).toBeDefined()
  })

  it('Should throw error when password is empty', () => {
    expect(() => {
      const password = new Password('')
      const password2 = new Password(null)
    }).toThrowError('Password cannot be empty')
  })

  it('Should throw error when a password has less than 8 characters', () => {
    expect(() => {
      const password = new Password('123')
    }).toThrowError('Password must have least 8 characters')
  })
})