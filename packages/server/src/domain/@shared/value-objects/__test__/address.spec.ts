/* eslint-disable @typescript-eslint/no-unused-vars */
import { Address } from '../address'

describe('Address value object unit test', () => {
  it('Should create adress', () => {
    const address = new Address('Street 1', '10', '60999-888', 'city 1', 'state 1', 'country 1')
    expect(address).toBeDefined()
    expect(address.street).toBe('Street 1')
    expect(address.number).toBe('10')
    expect(address.zip_code).toBe('60999-888')
    expect(address.city).toBe('city 1')
    expect(address.state).toBe('state 1')
    expect(address.country).toBe('country 1')
  })

  it('Should throw error when try to create a address without street', () => {
    expect(() => {
      const address = new Address('', '10', '60999-888', 'city 1', 'state 1', 'country 1')
    }).toThrowError('Street name cannot be empty')
  })

  it('Should throw error when try to create a address without Number', () => {
    expect(() => {
      const address = new Address('Street 1', '', '60999-888', 'city 1', 'state 1', 'country 1')
    }).toThrowError('Address number cannot be empty')
  })

  it('Should throw error when try to create a address without zip code', () => {
    expect(() => {
      const address = new Address('Street 1', '10', '', 'city 1', 'state 1', 'country 1')
    }).toThrowError('Zip code cannot be empty')
  })

  it('Should throw error when try to create a address without city', () => {
    expect(() => {
      const address = new Address('Street 1', '10', '60999-888', '', 'state 1', 'country 1')
    }).toThrowError('City cannot be empty')
  })

  it('Should throw error when try to create a address without state', () => {
    expect(() => {
      const address = new Address('Street 1', '10', '60999-888', 'city 1', '', 'country 1')
    }).toThrowError('State cannot be empty')
  })

  it('Should throw error when try to create a address without country', () => {
    expect(() => {
      const address = new Address('Street 1', '10', '60999-888', 'city 1', 'state 1', '')
    }).toThrowError('Country cannot be empty')
  })

})