/* eslint-disable @typescript-eslint/no-unused-vars */
import { Email } from '../email'

describe('Email value object unit test', () => {
  it('Should create a email', () => {
    const email = new Email('teste@domain.com')
    expect(email).toBeDefined()
    expect(email.email).toBe('teste@domain.com')
  })

  it('Should throw error when email is invalid', () => {
    expect(() => {
      const email = new Email('teste')
    }).toThrowError('Email "teste" is invalid.')
  })

  it('Should throw error when email is empty', () => {
    expect(() => {
      const email = new Email('')
    }).toThrowError('Email cannot be empty')
  })
})