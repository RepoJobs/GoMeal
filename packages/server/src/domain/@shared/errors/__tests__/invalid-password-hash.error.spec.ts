import { InvalidPasswordHash } from '@/domain/@shared/errors/invalid-password-hash.error'

describe('InvalidPasswordHash unit test', () => {
  it('should throw invalid password hash error', () => {
    expect(() => {
      throw new InvalidPasswordHash('Invalid Password Hash')
    }).toThrowError('Invalid Password Hash')
  })

  it('should throw invalid password hash error with 400 status when no status is set', () => {
    let errorData
    try {
      throw new InvalidPasswordHash('Invalid Password Hash')
    } catch(error) {
      errorData = error
    }

    expect(errorData).toMatchObject({
      status_code: 400
    })
  })

  it('should throw invalid password hash error with other status when status is defined on constructor', () => {
    let errorData
    try {
      throw new InvalidPasswordHash('Invalid Password Hash', 410)
    } catch(error) {
      errorData = error
    }

    expect(errorData).toMatchObject({
      status_code: 410
    })
  })
})