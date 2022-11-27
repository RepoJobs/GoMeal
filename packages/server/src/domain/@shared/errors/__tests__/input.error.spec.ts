import { InputError } from '@/domain/@shared/errors/input.error'

describe('InputError unit test', () => {
  it('should throw input error', () => {
    expect(() => {
      throw new InputError('Invalid Input')
    }).toThrowError('Invalid Input')
  })

  it('should throw input error with 400 status when no status is set', () => {
    let errorData

    try {
      throw new InputError('Invalid Input')
    } catch(error) {
      errorData = error
    }

    expect(errorData).toMatchObject({
      status_code: 400
    })
  })

  it('should throw input error with other status when status is defined on constructor', () => {
    let errorData

    try {
      throw new InputError('Invalid Input', 410)
    } catch(error) {
      errorData = error
    }

    expect(errorData).toMatchObject({
      status_code: 410
    })
  })
})