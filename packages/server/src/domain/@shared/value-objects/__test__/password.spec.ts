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

  it('should throw error when try to set invalid password hash when encrypt option is false', () => {
    expect(() => {
      const password = new Password('123', false)
    }).toThrowError('Cannot parse the password. Invalid Hash. Probably it\'s not encrypted.')
  })

  it('should create password with valid hash when encrypt option is false', () => {
    const hash = 'pbkdf2_sha256$48000$b05c472c45a8d5ccf255d218a860178b$rRqZmfds9u8rC0jj1y9iN8kK6/tkKaT+9w1AV57Zp3M='
    const password = new Password(hash, false)
    expect(password.hash).toBe(hash)
  })
})