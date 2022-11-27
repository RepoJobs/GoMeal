import { InvalidAddress } from '@/domain/@shared/errors/invalid-address.error'

describe('InvalidAddress unit test', () => {
  it('should throw invalid address error', () => {
    expect(() => {
      throw new InvalidAddress('invalid address')
    }).toThrowError('invalid address')
  })

  it('should throw invalid address error with 400 status when no status is set', () => {
    let errorData
    try {
      throw new InvalidAddress('invalid address')
    } catch(error) {
      errorData = error
    }

    expect(errorData).toMatchObject({
      status_code: 400
    })
  })

  it('should throw invalid address error with other status when status is defined on constructor', () => {
    let errorData
    try {
      throw new InvalidAddress('invalid address', 410)
    } catch(error) {
      errorData = error
    }

    expect(errorData).toMatchObject({
      status_code: 410
    })
  })
})