/* eslint-disable @typescript-eslint/no-unused-vars */
import { Name } from '../name'

describe('name value object unittest', () => {
  it('should create name', () => {
    const name = new Name('João', 'Amorim Silva')
    expect(name).toBeDefined()
    expect(name.firstName).toBe('João')
    expect(name.lastName).toBe('Amorim Silva')
    expect(name.fullName).toBe('João Amorim Silva')
  })

  it('Should throw error when try to create name without first name', () => {
    expect(() => {
      const name = new Name('')
      const name2 = new Name(null)
    }).toThrowError('The first name cannot be empty')
  })

  it('Should create name with first name and without last name', () => {
    const name = new Name('João')
    expect(name).toBeDefined()
    expect(name.firstName).toBe('João')
    expect(name.lastName).toBe(null)
    expect(name.fullName).toBe('João')
  })
})