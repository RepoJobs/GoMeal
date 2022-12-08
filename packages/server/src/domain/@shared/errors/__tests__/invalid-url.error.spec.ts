import { InvalidURL } from '@/domain/@shared/errors/invalid-url.error'

describe('InvalidURL unit test', () => {
  it('should throw invalid url error', () => {
    expect(() => {
      throw new InvalidURL('invalid url Hash')
    }).toThrowError('invalid url Hash')
  })

  it('should throw invalid url with 400 status when no status is set', () => {
    let errorData
    try {
      throw new InvalidURL('invalid url extensions')
    } catch(error) {
      errorData = error
    }

    expect(errorData).toMatchObject({
      status_code: 400
    })
  })

  it('should throw invalid url with other status when status is defined on constructor', () => {
    let errorData
    try {
      throw new InvalidURL('invalid url extensions', 410)
    } catch(error) {
      errorData = error
    }

    expect(errorData).toMatchObject({
      status_code: 410
    })
  })
})